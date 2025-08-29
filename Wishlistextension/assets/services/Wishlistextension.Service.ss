
function service(request, response)
{
	'use strict';
	try 
	{
		require('JJ.Wishlistextension.Wishlistextension.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JJ.Wishlistextension.Wishlistextension.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}