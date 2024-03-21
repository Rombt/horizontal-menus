/**
 *
 * must be this html, look in the snippets:
 *
 * <div class="quantity-block">
 *    <button class="quantity-arrow-minus" type="button"> - </button>
 *    <input class="quantity-num" type="number" value="1" />
 *    <button class="quantity-arrow-plus" type="button"> + </button>
 * </div>
 *
 *
 */

jQuery(document).ready(function ($) {
  (function quantityProducts() {
    var $quantityArrowMinus = $('.quantity-arrow-minus');
    var $quantityArrowPlus = $('.quantity-arrow-plus');
    var $quantityNum = $('.qty'); // specify the class of your input

    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);

    function quantityMinus() {
      if ($quantityNum.val() > 1) {
        $quantityNum.val(+$quantityNum.val() - 1);
      }
    }

    function quantityPlus() {
      $quantityNum.val(+$quantityNum.val() + 1);
    }
  })();
});
