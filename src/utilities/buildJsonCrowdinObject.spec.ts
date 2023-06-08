import { CollectionConfig, Field } from "payload/types"
import { buildCrowdinJsonObject, getLocalizedFields } from "."
import { FieldWithName } from "../types"

describe("fn: buildCrowdinJsonObject", () => {
  it ("does not include undefined localized fields", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Test Policy created with title',
      status: 'draft',
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const localizedFields: FieldWithName[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      {
        name: 'anotherString',
        type: 'text',
        localized: true,
      }
    ]
    const expected = {
      title: 'Test Policy created with title',
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })

  it ("includes localized fields", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Text value',
      anotherString: 'Another text value',
      description: 'A textarea value.\nWith a new line.',
      status: 'draft',
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const localizedFields: FieldWithName[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      {
        name: 'anotherString',
        type: 'text',
        localized: true,
      },
      {
        name: 'description',
        type: 'textarea',
        localized: true,
      }
    ]
    const expected = {
      title: 'Text value',
      anotherString: 'Another text value',
      description: 'A textarea value.\nWith a new line.',
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })

  it ("includes localized fields nested in a group", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Test Policy created with title',
      groupField: {
        title: "Group title field content",
        text: "Group text field content",
        description: 'A textarea value.\nWith a new line.',
        select: "one"
      },
      status: 'draft',
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const fields: FieldWithName[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      // select not supported yet
      {
        name: 'select',
        type: 'select',
        localized: true,
        options: [
          'one',
          'two'
        ]
      },
      {
        name: 'groupField',
        type: 'group',
        fields: [
          {
            name: 'title',
            type: 'text',
            localized: true,
          },
          {
            name: 'text',
            type: 'text',
            localized: true,
          },
          {
            name: 'description',
            type: 'textarea',
            localized: true,
          },
          // select not supported yet
          {
            name: 'select',
            type: 'select',
            localized: true,
            options: [
              'one',
              'two'
            ]
          },
        ]
      },
    ]
    const localizedFields = getLocalizedFields({ fields })
    const expected = {
      title: 'Test Policy created with title',
      groupField: {
        title: "Group title field content",
        text: "Group text field content",
        description: 'A textarea value.\nWith a new line.',
      },
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })

  it ("includes localized fields nested in a group with a localization setting on the group field", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Test Policy created with title',
      groupField: {
        title: "Group title field content",
        text: "Group text field content",
        select: "one"
      },
      status: 'draft',
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const fields: FieldWithName[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      // select not supported yet
      {
        name: 'select',
        type: 'select',
        localized: true,
        options: [
          'one',
          'two'
        ]
      },
      {
        name: 'groupField',
        type: 'group',
        localized: true,
        fields: [
          {
            name: 'title',
            type: 'text',
          },
          {
            name: 'text',
            type: 'text',
          },
          // select not supported yet
          {
            name: 'select',
            type: 'select',
            options: [
              'one',
              'two'
            ]
          },
        ]
      },
    ]
    const localizedFields = getLocalizedFields({ fields })
    const expected = {
      title: 'Test Policy created with title',
      groupField: {
        title: "Group title field content",
        text: "Group text field content",
      },
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })

  it ("includes localized fields nested in an array", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Test Policy created with title',
      arrayField: [
        {
          title: "Array field title content one",
          text: "Array field text content one",
          select: "two",
          id: "64735620230d57bce946d370"
        },
        {
          title: "Array field title content two",
          text: "Array field text content two",
          select: "two",
          id: "64735621230d57bce946d371"
        }
      ],
      status: 'draft',
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const fields: FieldWithName[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      // select not supported yet
      {
        name: 'select',
        type: 'select',
        localized: true,
        options: [
          'one',
          'two'
        ]
      },
      {
        name: 'arrayField',
        type: 'array',
        fields: [
          {
            name: 'title',
            type: 'text',
            localized: true,
          },
          {
            name: 'text',
            type: 'text',
            localized: true,
          },
          {
            name: 'select',
            type: 'select',
            localized: true,
            options: [
              'one',
              'two'
            ]
          },
        ]
      },
    ]
    const localizedFields = getLocalizedFields({ fields })
    const expected = {
      title: 'Test Policy created with title',
      arrayField: [
        {
          title: "Array field title content one",
          text: "Array field text content one",
        },
        {
          title: "Array field title content two",
          text: "Array field text content two",
        }
      ],
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })

  it ("includes localized fields nested in an array with a localization setting on the array field", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Test Policy created with title',
      arrayField: [
        {
          title: "Array field title content one",
          text: "Array field text content one",
          select: "two",
          id: "64735620230d57bce946d370"
        },
        {
          title: "Array field title content two",
          text: "Array field text content two",
          select: "two",
          id: "64735621230d57bce946d371"
        }
      ],
      status: 'draft',
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const fields: FieldWithName[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      // select not supported yet
      {
        name: 'select',
        type: 'select',
        localized: true,
        options: [
          'one',
          'two'
        ]
      },
      {
        name: 'arrayField',
        type: 'array',
        localized: true,
        fields: [
          {
            name: 'title',
            type: 'text',
          },
          {
            name: 'text',
            type: 'text',
          },
          {
            name: 'select',
            type: 'select',
            options: [
              'one',
              'two'
            ]
          },
        ]
      },
    ]
    const localizedFields = getLocalizedFields({ fields })
    const expected = {
      title: 'Test Policy created with title',
      arrayField: [
        {
          title: "Array field title content one",
          text: "Array field text content one",
        },
        {
          title: "Array field title content two",
          text: "Array field text content two",
        }
      ],
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })

  it ("includes localized fields within a collapsible field", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Test Policy created with title',
      arrayField: [
        {
          title: "Array field title content one",
          text: "Array field text content one",
          select: "two",
          id: "64735620230d57bce946d370"
        },
        {
          title: "Array field title content two",
          text: "Array field text content two",
          select: "two",
          id: "64735621230d57bce946d371"
        }
      ],
      status: 'draft',
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const fields: Field[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      // select not supported yet
      {
        name: 'select',
        type: 'select',
        localized: true,
        options: [
          'one',
          'two'
        ]
      },
      {
        label: "Array fields",
        type: "collapsible",
        fields: [{
          name: 'arrayField',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
            },
            {
              name: 'text',
              type: 'text',
              localized: true,
            },
            {
              name: 'select',
              type: 'select',
              localized: true,
              options: [
                'one',
                'two'
              ]
            },
          ]
        }],
      },
    ]
    const localizedFields = getLocalizedFields({ fields })
    const expected = {
      title: 'Test Policy created with title',
      arrayField: [
        {
          title: "Array field title content one",
          text: "Array field text content one",
        },
        {
          title: "Array field title content two",
          text: "Array field text content two",
        }
      ],
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })

  it ("includes localized fields and meta @payloadcms/plugin-seo ", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Test Policy created with title',
      status: 'draft',
      meta: {
        title: 'Meta title value',
        description: 'Meta description value.\nCan contain new lines.',
      },
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const localizedFields: FieldWithName[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      {
        name: "meta",
        label: "SEO",
        type: "group",
        fields: [
          {
            name: "title",
            type: "text",
            localized: true,
            admin: {
              components: {}
            }
          },
          {
            name: "description",
            type: "textarea",
            localized: true,
            admin: {
              components: {}
            }
          }
        ]
      }
    ]
    const expected = {
      title: 'Test Policy created with title',
      meta: { title: 'Meta title value', description: 'Meta description value.\nCan contain new lines.', },
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })

  it ("includes localized fields and removes localization keys from meta @payloadcms/plugin-seo ", () => {
    const doc = {
      id: '638641358b1a140462752076',
      title: 'Test Policy created with title',
      status: 'draft',
      meta: { title: { en: 'Test Policy created with title | Teamtailor' } },
      createdAt: '2022-11-29T17:28:21.644Z',
      updatedAt: '2022-11-29T17:28:21.644Z'
    }
    const localizedFields: FieldWithName[] = [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      {
        name: "meta",
        label: "SEO",
        type: "group",
        fields: [
          {
            name: "title",
            type: "text",
            localized: true,
            admin: {
              components: {}
            }
          }
        ]
      }
    ]
    const expected = {
      title: 'Test Policy created with title',
      meta: { title: 'Test Policy created with title | Teamtailor' },
    }
    expect(buildCrowdinJsonObject({doc, fields: localizedFields})).toEqual(expected)
  })
})

describe("fn: buildCrowdinJsonObject - group nested in array", () => {
  const doc = {
    "id": "6474a81bef389b66642035ff",
    "title": "Experience the magic of our product!",
    "text": "Get in touch with us or try it out yourself",
    "ctas": [
        {
            "link": {
                "text": "Talk to us",
                "href": "#",
                "type": "ctaPrimary"
            },
            "id": "6474a80221baea4f5f169757"
        },
        {
            "link": {
                "text": "Try for free",
                "href": "#",
                "type": "ctaSecondary"
            },
            "id": "6474a81021baea4f5f169758"
        }
    ],
    "createdAt": "2023-05-29T13:26:51.734Z",
    "updatedAt": "2023-05-29T14:47:45.957Z",
    "crowdinArticleDirectory": {
        "id": "6474baaf73b854f4d464e38f",
        "updatedAt": "2023-05-29T14:46:07.000Z",
        "createdAt": "2023-05-29T14:46:07.000Z",
        "name": "6474a81bef389b66642035ff",
        "crowdinCollectionDirectory": {
            "id": "6474baaf73b854f4d464e38d",
            "updatedAt": "2023-05-29T14:46:07.000Z",
            "createdAt": "2023-05-29T14:46:07.000Z",
            "name": "promos",
            "title": "Promos",
            "collectionSlug": "promos",
            "originalId": 1633,
            "projectId": 323731,
            "directoryId": 1169
        },
        "originalId": 1635,
        "projectId": 323731,
        "directoryId": 1633
    }
  }
  const linkField: Field = {
    name: 'link',
    type: 'group',
    fields: [
      {
        name: 'text',
        type: 'text',
        localized: true,
      },
      {
        name: 'href',
        type: 'text'
      },
      {
        name: 'type',
        type: 'select',
        options: [
          'ctaPrimary',
          'ctaSecondary'
        ]
      }
    ]
  }
  const Promos: CollectionConfig = {
    slug: 'promos',
    admin: {
      defaultColumns: ['title', 'updatedAt'],
      useAsTitle: 'title',
      group: "Shared",
    },
    access: {
      read: () => true,
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      {
        name: 'text',
        type: 'text',
        localized: true,
      },
      {
        name: 'ctas',
        type: 'array',
        minRows: 1,
        maxRows: 2,
        fields: [
          linkField,
        ]
      }
    ]
  }

  const expected: any = {
    "ctas": [
        {
            "link": {
                "text": "Talk to us"
            }
        },
        {
            "link": {
                "text": "Try for free"
            }
        }
    ],
    "text": "Get in touch with us or try it out yourself",
    "title": "Experience the magic of our product!"
  }

  it('includes group json fields nested inside of array field items', () => {
    expect(buildCrowdinJsonObject({doc, fields:getLocalizedFields({ fields: Promos.fields, type: 'json'})})).toEqual(expected)
  })

  it('includes group json fields nested inside of array field items even when getLocalizedFields is run twice', () => {
    expect(buildCrowdinJsonObject({doc,
      fields: getLocalizedFields({ 
        fields: getLocalizedFields({ fields: Promos.fields })
      , type: 'json'})
      })).toEqual(expected)
  })

  /**
   * afterChange builds a JSON object for the previous version of
   * a document to compare with the current version. Ensure this
   * function works in that scenario. Also important for dealing
   * with non-required empty fields.
   */
  it('can work with an empty document', () => {
    expect(buildCrowdinJsonObject({doc: {},
      fields: getLocalizedFields({ fields: Promos.fields })
    })).toEqual({})
  })

  it('can work with an empty array field', () => {
    expect(buildCrowdinJsonObject({doc: {
      ...doc,
      ctas: undefined,
    },
      fields: getLocalizedFields({ fields: Promos.fields })
    })).toEqual({
      "text": "Get in touch with us or try it out yourself",
      "title": "Experience the magic of our product!"
    })
  })

  it('can work with an empty group field in an array', () => {
    expect(buildCrowdinJsonObject({doc: {
      ...doc,
      ctas: [
        {},
        {}
      ],
    },
      fields: getLocalizedFields({ fields: Promos.fields })
    })).toEqual({
      ctas: [
        {},
        {}
      ],
      "text": "Get in touch with us or try it out yourself",
      "title": "Experience the magic of our product!"
    })
  })
})