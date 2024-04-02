## Project Description

This script is designed to lowercase all tags within Zotero. I had a bunch of
tags in all different formatting due to some of them being auto generated and
couldn't find a clear, easy solution online. Lots of people said to use
`Developer->Run JavaScript` to fix it, but the actual script to do so wasn't
posted anywhere. So; here's a solution that works.

It retrieves all existing tags, converts them to lowercase, and renames them
accordingly. If a tag is already lowercase, it will be skipped. The script then
outputs the number of tags renamed and lists the tags that were modified.

### Usage

To use this script:

1. Ensure you have Zotero installed.
2. Run the script within the Zotero environment.
3. Review the output to confirm the tags have been renamed as expected.

### Code

```javascript
// Description: This script renames all tags to lowercase

// Get all tags as `zoteroTags`
var zoteroTags = await Zotero.Tags.getAll();
var tags = [];
var output = "";

// Loop through all tags and rename them to lowercase
await Zotero.DB.executeTransaction(async function() {
    for (let tag of zoteroTags) {
        let newTag = tag.tag.toLowerCase();

        // Skip if tag is already lowercase
        if (tag.tag === newTag) {
            continue;
        }
        // Add modified tags to tags array with new and old tag names
        tags.push("Renamed: '" + tag.tag + "' to '" + newTag + "'");
        // Rename tags
        Zotero.Tags.rename(Zotero.Libraries.userLibraryID, tag.tag, newTag);
    }
});

// Output the number of tags renamed and the tags that were renamed
output += `Renamed: ${tags.length} files\n\n`
output += tags.join(',\n')
return output
```

### Note

Ensure that you understand the implications of renaming tags within Zotero, as
this script directly modifies your library.
