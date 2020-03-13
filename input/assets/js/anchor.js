anchors.options.placement = 'left';
anchors.add();
var snippets = document.querySelectorAll("pre > code");
[].forEach.call(snippets, function(snippet) {
    snippet.insertAdjacentHTML("beforebegin", "<button class='btn-copy' data-clipboard-snippet><img class='clippy' width=13 src='/assets/images/clippy.svg' alt='Copy to clipboard'></button>");
});
var clipboardSnippets = new Clipboard('[data-clipboard-snippet]', {
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});
clipboardSnippets.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, "Copied!");
});
clipboardSnippets.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});
