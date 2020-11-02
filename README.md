# hallmark-lint-action

**A [GitHub Action](https://github.com/features/actions) to lint markdown files with [`hallmark`](https://github.com/vweevers/hallmark).**

![GitHub tag](https://img.shields.io/github/v/tag/vweevers/hallmark-lint-action?sort=semver)
[![Markdown Style Guide](https://img.shields.io/badge/md_style-hallmark-brightgreen.svg)](https://github.com/vweevers/hallmark)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```yaml
- name: Checkout
  uses: actions/checkout@v2
- name: Markdown Style Guide
  uses: vweevers/hallmark-lint-action@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
```

## Example

![Example](example.png)

## Inputs

- `token` (required): GitHub token for creating status checks with annotations
- `files`: newline-separated glob patterns of files to lint, default is `*.md`.

Hallmark can be further configured via [`package.json` or `.hallmarkrc`](https://github.com/vweevers/hallmark).

## License

[GPL-3.0](LICENSE)
