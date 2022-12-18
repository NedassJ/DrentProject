using DrentL1.Data;
using DrentL1.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DrentL1.Auth.Model;
using Microsoft.IdentityModel.Tokens;
using DrentL1.Data.Dtos.Auth;
using System.Text;
using DrentL1.Auth;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper.Configuration;



var builder = WebApplication.CreateBuilder(args);
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();



builder.Services.AddIdentity<SystemUser, IdentityRole>()
.AddEntityFrameworkStores<SystemDbContext>()
                .AddDefaultTokenProviders();

builder.Services.AddDirectoryBrowser();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"];
        options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"];
        options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]));
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SameUser", policy => policy.Requirements.Add(new SameUserRequirement()));
});

builder.Services.AddSingleton<IAuthorizationHandler, SameUserAuthorization>();


builder.Services.AddDbContext<SystemDbContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddControllers();

builder.Services.AddTransient<IWarehousesRepository, WarehousesRepository>();
builder.Services.AddTransient<IItemsRepository, ItemsRepository>();
builder.Services.AddTransient<ICommentsRepository, CommentsRepository>();
builder.Services.AddTransient<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddTransient<ITokenManager, TokenManager>();
builder.Services.AddTransient<IRefreshToken, RefreshToken>();
builder.Services.AddTransient<DatabaseSeeder, DatabaseSeeder>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 3;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredUniqueChars = 0;
});

builder.Services.AddSingleton<IRefreshTokenGenerator, RefreshTokenGenerator>();
//builder.Services.AddSingleton<IRefreshToken>(x => new RefreshToken(x.GetService<Microsoft.Extensions.Configuration.IConfiguration>(), x.GetService<IRefreshTokenRepository>(), x.GetService<TokenManager>()));

var app = builder.Build();

//app.UseCors("CORSPolicy");

app.UseRouting();

app.MapControllers();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();



app.UseAuthentication();
app.UseAuthorization();

app.UseCors(builder => {
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
});


//app.MapRazorPages();


var dbSeeder = app.Services.CreateScope().ServiceProvider.GetRequiredService<DatabaseSeeder>();
await dbSeeder.SeedAsync();

app.Run();
