class RawEntry {
    constructor(link, title, published) {
        this.link = link;
        this.title = title;
        this.published = published;
    }
}

class EntryOptions {
    constructor(count, layoutTemplate, entryTemplate, newVideo) {
        this.count = count;
        this.layoutTemplate = layoutTemplate;
        this.entryTemplate = entryTemplate;
        this.newVideo = newVideo;
    }

}

class RSS {
    constructor(url, elementId, entryOptions) {
        this.url = url;
        this.elementId = elementId;
        this.entryOptions = entryOptions;
    }

    htmlItems(items) {
        let entries = ''
        for (let i in items) {
            const entry = items[i];
            let templ = this.entryOptions.entryTemplate;
            templ = templ.replace(/{link}/g, entry.link)
                .replace(/{title}/g, entry.title)
                .replace(/{published}/g, entry.pubDate)
                .replace(/{description}/g, entry.description)
                .replace(/{thumbnail}/g, entry.thumbnail);
            entries += templ;
        }

        return this.entryOptions.layoutTemplate.replace('{entries}', entries)
    }

    htmlNewVideo(entry) {
        let videoId = null;
        // Try extracting from guid if it matches yt:video:ID format
        if (entry.guid && entry.guid.startsWith('yt:video:')) {
            videoId = entry.guid.split(':')[2];
        }

        // Fallback: match v=ID in the link
        if (!videoId && entry.link) {
            const match = entry.link.match(/[?&]v=([^&]+)/);
            if (match) {
                videoId = match[1];
            }
        }

        // If still no ID, try last segment of URL (for short links)
        if (!videoId && entry.link) {
            const parts = entry.link.split('/');
            videoId = parts[parts.length - 1];
        }

        // Final fallback/safeguard
        if (!videoId) videoId = '';

        const entries = this.entryOptions.entryTemplate.replace(/{guid}/g, videoId)
        return this.entryOptions.layoutTemplate.replace('{entries}', entries)
    }

    formatParams(params) {
        return "?" + Object
            .keys(params)
            .map(function (key) {
                return key + "=" + encodeURIComponent(params[key])
            })
            .join("&")
    }

    renderEntries() {
        const self = this;
        const urlParams = {
            rss_url: this.url,
            api_key: '8y4p9qou0fpisa71fmg0lg1o7elbbwyshtlwi8pe',
            count: this.entryOptions.count ? this.entryOptions.count : 3
        }
        const request = new XMLHttpRequest();
        request.open("GET", 'https://api.rss2json.com/v1/api.json' + this.formatParams(urlParams));
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {
            if (request.status === 200) {
                const response = JSON.parse(this.responseText)
                let htmlContent = self.entryOptions.newVideo ? self.htmlNewVideo(response.items[0]) : self.htmlItems(response.items);
                let htmlElement = document.getElementById(self.elementId);
                htmlElement.innerHTML = htmlContent;

            }
        };
        request.send(JSON.stringify(urlParams));
    }
}