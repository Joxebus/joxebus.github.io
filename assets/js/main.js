document.addEventListener('DOMContentLoaded', function () {

    // Main YouTube Video
    new RSS('https://www.youtube.com/feeds/videos.xml?channel_id=UCZlRK9pPpcFBZSNpKlaOXqg',
        "latest-youtube-video",
        new EntryOptions(
            1,
            '<div class="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg bg-black">{entries}</div>',
            '<iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/{guid}" allow="encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
            true
        )).renderEntries();

    // Blog Feeds (GitHub Pages)
    new RSS('https://joxebus.github.io/blog/feed.xml',
        "rss-feeds-blog-github",
        new EntryOptions(
            3,
            "{entries}",
            `<div class="flex flex-col border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <h4 class="font-bold text-slate-800 hover:text-blue-600 transition-colors">
                        <a href="{link}" target="_blank">{title}</a>
                    </h4>
                    <div class="mt-1">
                         <a class="text-sm text-blue-500 hover:text-blue-700 font-medium inline-flex items-center" href="{link}" target="_blank">
                            Read more <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                        </a>
                    </div>
                </div>`
        )).renderEntries();

    // Blog Feeds (WordPress)
    new RSS('https://groovylopeando.wordpress.com/feed/',
        "rss-feeds-blog",
        new EntryOptions(
            3,
            "{entries}",
            `<div class="flex flex-col border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <h4 class="font-bold text-slate-800 hover:text-blue-600 transition-colors">
                        <a href="{link}" target="_blank">{title}</a>
                    </h4>
                    <p class="text-slate-500 text-sm mt-1 line-clamp-2">{description}</p>
                    <div class="mt-2">
                         <a class="text-sm text-blue-500 hover:text-blue-700 font-medium inline-flex items-center" href="{link}" target="_blank">
                            Read more <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                        </a>
                    </div>
                </div>`
        )).renderEntries();

    // Medium Feeds
    new RSS('https://medium.com/feed/@joxebus',
        "rss-feeds-medium",
        new EntryOptions(
            3,
            "{entries}",
            `<div class="flex flex-col border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <h4 class="font-bold text-slate-800 hover:text-blue-600 transition-colors">
                        <a href="{link}" target="_blank">{title}</a>
                    </h4>
                    <div class="mt-1">
                         <a class="text-sm text-blue-500 hover:text-blue-700 font-medium inline-flex items-center" href="{link}" target="_blank">
                            Read more <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                        </a>
                    </div>
                </div>`
        )).renderEntries();

    // YouTube List
    new RSS('https://www.youtube.com/feeds/videos.xml?channel_id=UCZlRK9pPpcFBZSNpKlaOXqg',
        "rss-feeds-youtube",
        new EntryOptions(
            5,
            "{entries}",
            `<div class="flex items-start space-x-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0 pt-4 first:pt-0">
                    <div class="flex-shrink-0 w-24">
                        <img class="w-full rounded shadow-sm hover:opacity-80 transition-opacity" src="{thumbnail}" alt="{title}"/>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-800 text-sm hover:text-blue-600 transition-colors line-clamp-2">
                            <a href="{link}" target="_blank">{title}</a>
                        </h4>
                        <a class="text-xs text-blue-500 hover:text-blue-700 font-medium mt-1 inline-block" href="{link}" target="_blank">
                            Watch <i class="fas fa-play-circle ml-1"></i>
                        </a>
                    </div>
                </div>`
        )).renderEntries();

    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    // Ensure selector exists before running
    if (document.getElementById('ghfeed')) {
        GitHubActivity.feed({ username: "Joxebus", selector: "#ghfeed", limit: 10 });
    }

});
