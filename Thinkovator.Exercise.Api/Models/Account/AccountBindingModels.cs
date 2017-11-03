using System.ComponentModel.DataAnnotations;

namespace Thinkovator.Exercise.Api.Models.Account
{
  public class AddExternalLoginBindingModel
  {
    [Required]
    [Display(Name = "External access token")]
    public string ExternalAccessToken { get; set; }
  }

  public class RegisterBindingModel
  {
    [Required]
    [Display(Name = "Name")]
    public string Name { get; set; }

    [Required]
    [Display(Name = "Email")]
    public string Email { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }
    
    [DataType(DataType.Password)]
    [Display(Name = "Confirm Password")]
    [Compare("Password", ErrorMessage = "The Password and Confirmation Password do not match.")]
    public string ConfirmPassword { get; set; }

    [Required]
    [Display(Name = "Pin")]
    public string Pin { get; set; }
  }

  public class RegisterExternalBindingModel
  {
    [Required]
    [Display(Name = "Email")]
    public string Email { get; set; }
  }

  public class ChangePasswordBindingModel
  {
    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Current Password")]
    public string OldPassword { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "New Password")]
    public string NewPassword { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "Confirm Password")]
    [Compare("NewPassword", ErrorMessage = "The New Password and Confirm Password do not match.")]
    public string ConfirmNewPassword { get; set; }
  }

  public class ForgotPasswordBindingModel
  {
    [Required]
    [DataType(DataType.EmailAddress)]
    [Display(Name = "Email")]
    public string Email { get; set; }
  }

  public class ResetPasswordBindingModel
  {
    [Required]
    [DataType(DataType.EmailAddress)]
    [Display(Name = "Email")]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Text)]
    [Display(Name = "Token")]
    public string Token { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "New password")]
    public string NewPassword { get; set; }
  }

  public class RemoveLoginBindingModel
  {
    [Required]
    [Display(Name = "Login provider")]
    public string LoginProvider { get; set; }

    [Required]
    [Display(Name = "Provider key")]
    public string ProviderKey { get; set; }
  }
}
