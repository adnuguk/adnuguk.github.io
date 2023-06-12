var metaElements = document.getElementsByTagName('meta');

var disqus_shortname = 'aberdeendevelopersnetusergroup'; // required: replace example with your forum shortname
var disqus_identifier;
var disqus_title;
var disqus_url;

for (var i = 0; i < metaElements.length; i++) {
    var element = metaElements[i];
    var propAttribute = element.getAttribute('property');
    if (propAttribute === 'og:title') {
        disqus_title = element.getAttribute('content');
    }
    else if (propAttribute === 'og:url') {
        disqus_url = element.getAttribute('content');
        disqus_identifier = disqus_url.split(/\//).pop();
    }
}

/* * * DON'T EDIT BELOW THIS LINE * * */
(function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();
