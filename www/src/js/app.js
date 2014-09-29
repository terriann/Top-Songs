// **This example introduces two new Model actions (swap and delete), illustrating how such actions can be handled within a Model's View.**
//
// _Working example: [5.html](../5.html)._

//
(function($){
  // `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
  Backbone.sync = function(method, model, success, error){
    success();
  }
//  var listView = new ListView();
	var appview = new AppView();


})(jQuery);

// <div style="float:left; margin-bottom:40px;"><img style="width:36px; margin:5px 10px 0 5px;" src="https://g.twimg.com/Twitter_logo_blue.png"/></div> <div style="background:rgb(245,245,255); padding:10px;">Follow me on Twitter: <a target="_blank" href="http://twitter.com/r2r">@r2r</a> </div>
// <script>
//   if (window.location.href.search(/\?x/) < 0) {
//     var _gaq = _gaq || [];
//     _gaq.push(['_setAccount', 'UA-924459-7']);
//     _gaq.push(['_trackPageview']);
//     (function() {
//       var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//       ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//     })();
//   }
// </script>