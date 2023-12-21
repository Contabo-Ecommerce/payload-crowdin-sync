# Serializer configuration

[@slate-serializers/html](https://www.npmjs.com/package/@slate-serializers/html) is used to convert between Slate JSON in Payload CMS and HTML content on Crowdin.

There are some scenarios where you may wish to customise the configuration of these serializers. Examples:

- Indent formatting is not serialized. For example, customise the serializer to pass a HTML class attribute value.
- The Slate rich text editor in Payload CMS can be customised with plugins. Use serializer configuration to handle such customisations. For example, serialize Slate JSON generated by a table plugin (not included by default in the Payload CMS implementation of Slate).

This can be done through the plugin configuration. The default options are made available for convenience. The default configuration is completely replace when passing the configuration, so take care to extend the default configuration if you only want to customise some options.

```ts
import { crowdinSync, payloadHtmlToSlateConfig, payloadSlateToHtmlConfig } from 'payload-crowdin-sync'

export default buildConfig({
  plugins: [
    crowdinSync({
      projectId: 323731,
      directoryId: 1169,
      token: process.env.CROWDIN_TOKEN,
      localeMap: {
        de_DE: {
          crowdinId: "de",
        },
        fr_FR: {
          crowdinId: "fr",
        },
      },
      sourceLocale: "en",
      slateToHtmlConfig: {
        ...payloadSlateToHtmlConfig,
        elementMap: {
          ...payloadSlateToHtmlConfig.elementMap,
          table: "table",
          ["table-row"]: "tr",
          ["table-cell"]: "td",
          ["table-header"]: "thead",
          ["table-header-cell"]: "th",
          ["table-body"]: "tbody",
        },
      },
    }),
  ],
  // The rest of your config goes here
});
```