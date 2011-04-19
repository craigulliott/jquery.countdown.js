/*
 * jQuery Countdown Plugin By Craig Ulliott 2010
 * version: 0.1
 *
 * requires the metadata plugin
 * add {seconds_left:integer} to your dom element
 */
// create closure for the plugin
(function($) {
    
  // define the main method
  $.fn.Countdown = function(options) {

    // override default options
    var settings = jQuery.extend({
      reload_at_zero: false
    }, options);
    
    // iterate through
    return this.each(function() {
      
      var countdown_elt = this;
      
      if( typeof this.seconds_left == 'undefined' ){
        this.seconds_left = $(countdown_elt).metadata().seconds_left;
      }
      
      this.seconds_left = this.seconds_left - 1;
      
      if( this.seconds_left <= 0 && settings.reload_at_zero ){
        Utility.page_reload();
      }
      
      // break into days, hours, minutes, seconds
      var expires = {};
      expires.days = Math.floor( (this.seconds_left / 86400) );
      expires.hours = Math.floor( (this.seconds_left / 3600) - ( expires.days * 24 ) );
      expires.minutes = Math.floor( (this.seconds_left / 60) - ( expires.days * 1440 ) - ( expires.hours * 60 ) );
      expires.seconds = this.seconds_left % 60;

      // build the html
      html = '';
      switch( true ){
        case expires.days > 0:
          html += expires.days +' Days : ';
        case expires.hours > 0:
          html += expires.hours +' Hr : ';
        case expires.minutes > 0:
          html += expires.minutes +' Min : ';
        case expires.seconds > 0:
          html += expires.seconds +' Sec';
      }

      // update the page, all the html at once as its cleaner
      $(countdown_elt).html(html);
      
    });
        
  };
    
})(jQuery);
