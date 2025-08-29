define(
  'JJ.Wishlistextension.Wishlistextension',
  [
    'JJ.Wishlistextension.Wishlistextension.View',
    'Facets.ItemCell.View',
    'ProductDetails.AddToProductList.View',
    'Item.Model',
    'underscore',
    'Product.Model',
    'ProductDetails.Full.View'
  ],
  function (
    WishlistextensionView,
    FacetsItemCellView,
    ProductDetailsAddToProductListView,
    ItemModel,
    _,
    ProductModel,
    ProductDetailsFullView
  ) {
    'use strict';

    return {
      mountToApp: function mountToApp(container) {
        try {
          const createMinimalProductModel = function (itemModel) {
            const productModel = new ProductModel({
              item: itemModel,
              quantity: 1
            });

            productModel.areAttributesValid = () => true;
            productModel.isSelectionComplete = () => true;
            productModel.getSelectedOptions = () => [];

            return productModel;
          };

          // Extend FacetsItemCellView with child view
          _.extend(FacetsItemCellView.prototype.childViews, {
            AddToProductList: function () {
              const itemModel = this.model;
              const isMatrixParent = itemModel.get("matrixchilditems_detail")?.length > 0;
              const isMatrixChild = !!itemModel.get("matrix_parent");

              if (!isMatrixParent && !isMatrixChild) {
                const productModel = createMinimalProductModel(itemModel);
                return new ProductDetailsAddToProductListView({
                  model: productModel,
                  application: this.options.application,
                  childViews: {
                    WishlistModuleView: function () {
                      return new WishlistextensionView({
                        container: this.options.application,
                        model: productModel
                      });
                    }
                  }
                });
              } else {
                return null;
              }
            }
          });

          // Extend context to include item type flags
          _.extend(FacetsItemCellView.prototype, {
            getContext: _.wrap(FacetsItemCellView.prototype.getContext, function (fn) {
              const context = fn.apply(this, _.toArray(arguments).slice(1));
              const itemModel = this.model;

              context.isMatrixParent = itemModel.get("matrixchilditems_detail")?.length > 0;
              context.isMatrixChild = !!itemModel.get("matrix_parent");
              context.isSimpleItem = !context.isMatrixParent && !context.isMatrixChild;

              return context;
            })
          });

          // PDP logic (optional)
          _.extend(ProductDetailsFullView.prototype, {
            childViews: _.extend({}, ProductDetailsFullView.prototype.childViews, {
              AddToProductList: function () {
                return new ProductDetailsAddToProductListView({
                  model: this.model,
                  application: this.options.application
                });
              }
            })
          });

         _.extend(FacetsItemCellView.prototype, {
      events: _.extend({}, FacetsItemCellView.prototype.events, {
        'mouseover [data-action="wishlist-hover"]': "showTooltip",
      }),
 
      render: function () {
        const view = FacetsItemCellView.__super__.render.apply(this, arguments);
        this.updateWishlistButtonColor(); // Run after DOM is rendered
        return view;
      },
 
      updateWishlistButtonColor: function () {
        this.$el.find("[data-item-id]").each(function () {
          const $item = jQuery(this);
          const $checkbox = $item.find(
            "input.product-list-control-item-checkbox"
          );
          const $button = $item.find(".product-list-control-button-wishlist");
 
          if ($checkbox.length && $button.length) {
            if ($checkbox.is(":checked")) {
              $button.addClass("wishlist-active");
            } else {
              $button.removeClass("wishlist-active");
            }
          }
        });
      },
 
      showTooltip: function (e) {
        if (e && e.currentTarget) {
          const $target = jQuery(e.currentTarget);
          const $item = $target.closest("[data-item-id]");
          const isMatrixItem =
            !!this.model.get("matrix_parent") ||
            (this.model.get("matrixchilditems_detail") || []).length > 0;
 
          const updateTooltipAndColor = function ($checkbox, $button) {
            if ($checkbox.length && $button.length) {
              const isChecked = $checkbox.is(":checked");
              const tooltipMessage = isChecked
                ? "Remove from Wishlist"
                : "Add to Wishlist";
              $target.removeAttr("title").attr("data-tooltip", tooltipMessage);
 
              if (isChecked) {
                $button.addClass("wishlist-active");
              } else {
                $button.removeClass("wishlist-active");
              }
            }
          };
 
          if (isMatrixItem) {
            setTimeout(function () {
              const $modal = jQuery(".modal-container:visible");
              const $checkbox = $modal.find(
                "input.product-list-control-item-checkbox"
              );
              const $button = $modal.find(
                ".product-list-control-button-wishlist"
              );
              updateTooltipAndColor($checkbox, $button);
            }, 500);
          } else {
            const $checkbox = $item.find(
              "input.product-list-control-item-checkbox"
            );
            const $button = $item.find(".product-list-control-button-wishlist");
            updateTooltipAndColor($checkbox, $button);
          }
        }
      },
    });

        } catch (e) {
          console.error('Wishlist Extension Error:', e.message);
        }
      }
    };
  }
);
