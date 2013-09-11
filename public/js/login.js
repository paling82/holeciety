$(document).ready( function(){
	
	$("#login-form").ajaxForm({
		success : function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/dashboard';
		},
		error : function (err){
			alert(err);
		}
	});
})