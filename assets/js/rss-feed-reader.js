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
            entries += this.entryOptions.entryTemplate.replace('{link}', entry.link)
                .replace('{title}', entry.title)
                .replace('{published}', entry.pubDate)
                .replace('{description}', entry.description)
                .replace('{thumbnail}', entry.thumbnail)
        }

        return this.entryOptions.layoutTemplate.replace('{entries}', entries)
    }

    htmlNewVideo(entry) {
        let videoId = entry.guid.split(":")[2];
        // Fallback: extract from link if guid split failed or returned URL-like string
        if (!videoId || videoId.includes('/') || videoId.length < 5) {
            const match = entry.link.match(/[?&]v=([^&]+)/);
            if (match) {
                videoId = match[1];
            } else {
                // Last resort: try to extract from the end of the link if it's a short link
                const parts = entry.link.split('/');
                videoId = parts[parts.length - 1];
            }
        }
        const entries = this.entryOptions.entryTemplate.replace('{guid}', videoId)
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