---
'@thumbnailer/processor': patch
'@thumbnailer/api': patch
---

Fix possible name collision and hardcoded file extension (#7)

There was a possiblity of name collision when someone uploads a file with the `thumbnail` name, although there was no issues for the user, the original files were lost on our side.
We fixed the issue by giving a reasonable name for the original uploads to store alongside the processed thumbnail.

Another issue affecting users was due to hardcoded `jpg` file extension in the processor, effectively producing incorrect extension for non-jpg files.
This was filed by relying on the original uploads' extension.
