  var appview = new AppView;

$(document).ready(function(){

			/*
			 * Instance CirclePlayer inside jQuery doc ready
			 *
			 * CirclePlayer(jPlayerSelector, media, options)
			 *   jPlayerSelector: String - The css selector of the jPlayer div.
			 *   media: Object - The media object used in jPlayer("setMedia",media).
			 *   options: Object - The jPlayer options.
			 *
			 * Multiple instances must set the cssSelectorAncestor in the jPlayer options. Defaults to "#cp_container_1" in CirclePlayer.
			 */

			var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",
			{
				m4a: "http://a1480.phobos.apple.com/us/r1000/146/Music4/v4/d1/72/98/d172985a-8789-5a10-b72a-d18d7542356e/mzaf_7410819606978501217.plus.aac.p.m4a"
			}, {
				cssSelectorAncestor: "#cp_container_1"
			});
		});