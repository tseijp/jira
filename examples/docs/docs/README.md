# Getting started

## Installation

```ruby
npm i @tsei/jira
```

or

```ruby
yarn add @tsei/jira
```

## Install from CDN or static hosting

The following code also works in vscode markdown preview

```html
<pre id="id">
# Todo
- [x] Task 0
# In Progress
- [x] Task 1
# Review
- [x] Task 2
# Done
- [x] Task 3
</pre>
<script type="module">
        import createJIRA from 'https://esm.sh/@tsei/jira@0.2.0'
        window.addEventListener('DOMContentLoaded', createJIRA('id'))
</script>
```
