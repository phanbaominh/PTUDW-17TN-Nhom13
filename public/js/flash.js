function flash(content) {
  const { successMessage, errorMessage } = content;
  if (successMessage) {
    setTimeout(function() {
      toastr.options = {
        closeButton: true,
        progressBar: true,
        showMethod: 'slideDown',
        timeOut: 2000
      };
      toastr.success(successMessage, "System");
    }, 100);
  }
      
  if (errorMessage) {
    setTimeout(function() {
      toastr.options = {
        closeButton: true,
        progressBar: true,
        showMethod: 'slideDown',
        timeOut: 2000
      };
    toastr.error(errorMessage, "System");
    }, 100);
  }
}


    