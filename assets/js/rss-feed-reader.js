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
    constructor(url, elementId, selector, entryOptions) {
        this.url = url;
        this.elementId = elementId;
        this.selector = selector;
        this.entryOptions = entryOptions;
    }

    htmlItems(items) {
        let entries = ''
        for(let i in items) {
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
        const guid = entry.guid.split(":")[2]
        console.log("Entry: "+entry)
        console.log("Entry.guid: "+entry.guid)
        console.log("GUID: "+guid)
        const entries = this.entryOptions.entryTemplate.replace('{guid}', guid)
        return this.entryOptions.layoutTemplate.replace('{entries}', entries)
    }

    formatParams(params){
        return "?" + Object
            .keys(params)
            .map(function(key){
                return key+"="+encodeURIComponent(params[key])
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
        request.open("GET", 'https://api.rss2json.com/v1/api.json'+this.formatParams(urlParams));
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function( ) {
            if(request.status === 200) {
                const response = JSON.parse(this.responseText)
                let htmlContent = self.entryOptions.newVideo ? self.htmlNewVideo(response.items[0]) : self.htmlItems(response.items);
                let htmlElement = document.getElementById(self.elementId);
                htmlElement.innerHTML = htmlContent;

            }
        };
        request.send(JSON.stringify(urlParams));
    }
}