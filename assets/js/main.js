$(window).on('load', function() {

    $('.level-bar-inner').each(function() {
    
        var itemWidth = $(this).data('level');
        
        $(this).animate({
            width: itemWidth
        }, 800);
        
    });

    new RSS('https://www.youtube.com/feeds/videos.xml?channel_id=UCZlRK9pPpcFBZSNpKlaOXqg',
            "latest-youtube-video",
            "item",
            new EntryOptions(
                1,
                '<div class="embed-responsive embed-responsive-16by9 has-ribbon">{entries}</div>',
                '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/{guid}" allow="encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="ribbon"><div class="text">New</div></div>',
                true

            )).renderEntries()

    new RSS('https://joxebus.github.io/blog/feed.xml',
            "rss-feeds-blog-github",
            "item",
            new EntryOptions(
                3,
                "<div class='items'>{entries}</div>",
                '<div class="item"><h3 class="title"><a href="{link}" target="_blank">{title}</a></h3><div><a class="more-link" href="{link}" target="_blank"><i class="fas fa-external-link-alt"></i>Read more</a></div></div>'

            )).renderEntries()

    new RSS('https://groovylopeando.wordpress.com/feed/',
            "rss-feeds-blog",
            "item",
            new EntryOptions(
                3,
                "<div class='items'>{entries}</div>",
                '<div class="item"><h3 class="title"><a href="{link}" target="_blank">{title}</a></h3><div><p>{description}</p><a class="more-link" href="{link}" target="_blank"><i class="fas fa-external-link-alt"></i>Read more</a></div></div>'

            )).renderEntries()

    new RSS('https://medium.com/feed/@joxebus',
            "rss-feeds-medium",
            "item",
            new EntryOptions(
                3,
                "<div class='items'>{entries}</div>",
                '<div class="item"><h3 class="title"><a href="{link}" target="_blank">{title}</a></h3><div><a class="more-link" href="{link}" target="_blank"><i class="fas fa-external-link-alt"></i>Read more</a></div></div>'

            )).renderEntries()

    new RSS('https://www.youtube.com/feeds/videos.xml?channel_id=UCZlRK9pPpcFBZSNpKlaOXqg',
            "rss-feeds-youtube",
            "item",
            new EntryOptions(
                5,
                "<div class='items'>{entries}</div>",
                '<div class="item"><h3 class="title"><a href="{link}" target="_blank">{title}</a></h3><div><p><img class="img-fluid" src="{thumbnail}"/></p><a class="more-link" href="{link}" target="_blank"><i class="fas fa-external-link-alt"></i>See video</a></div></div>'

            )).renderEntries()


});


jQuery(document).ready(function($) {


    /*======= Skillset *=======*/
    
    $('.level-bar-inner').css('width', '0');
    
    
    
    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
    
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */

    
    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({username: "Joxebus", selector: "#ghfeed", limit: 20 });


});