// @module JJ.Wishlistextension.Wishlistextension
define('JJ.Wishlistextension.Wishlistextension.View'
,	[
	'jj_wishlistextension_wishlistextension.tpl'
	
	,	'JJ.Wishlistextension.Wishlistextension.SS2Model'
	
	,	'Backbone'
    ]
, function (
	jj_wishlistextension_wishlistextension_tpl
	
	,	WishlistextensionSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class JJ.Wishlistextension.Wishlistextension.View @extends Backbone.View
	return Backbone.View.extend({

		template: jj_wishlistextension_wishlistextension_tpl

	,	initialize: function (options) {

			  this.container = options.container;
    		this.model = options.model;
 
    if (!this.model) {
        console.warn('Model not passed to mywishlidtmoduleView');
    } else {
        console.log('Model received in wishlist view:', this.model.toJSON());
    }
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return JJ.Wishlistextension.Wishlistextension.View.Context
	,	getContext: function getContext()
		{
			//@class JJ.Wishlistextension.Wishlistextension.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
