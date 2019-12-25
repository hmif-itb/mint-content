# Adding Mint Content

Mint content is organized into Interviews, Sections, and Contents.

- Interviews organizes the sections based on the interview type (e.g. technical interview, product manager interviews).
- Sections organizes the Contents onto distinct parts that are displayed one at a time (e.g. Introduction, Resume Review, Coding Test).
- Contents are the actual text that will be displayed to the user. For each interview sessions, the Content that will be shown is randomized.

## Directory Structure

All Mint Content lives in the `/src/content` directory.
- The directories directly under the `/src/content` directory is the Interviews. The name of the interviews folder is arbitrary.
- Inside the directory of each Interview, there must be a `manifest.yaml` file to indicate the interview title and authors. Otherwise, the directory will not be considered as an Interview.
- The Sections are defined inside the Interview directories. 
  - For single-content sections, create a Markdown file with the following format: `{order}_{title}.md`. For example, to create the section "Introduction" that should be shown first, create a "1_Introduction.md" file.
  - For multiple-contents sections, create a folder with the name in the following format: `{order}_{title}`. Inside that folder, create Markdown files with arbitrary names having the `.md` extension.

## Contents file

All the contents are written in Markdown with the file extension lowercase `.md`. Standard Markdown annotations are supported.

## Interview manifest file

Interview manifest files must have the exact filename `manifest.yaml`. The following is an example of a manifest file:

```yaml
title: "Technical/Software Engineering"
authors:
  - "Emperor Ucup"
  - "Lord Agwar"
```
