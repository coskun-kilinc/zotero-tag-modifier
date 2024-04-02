// Description: This script renames all tags to lowercase

// Get all tags as zoteroTags
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

