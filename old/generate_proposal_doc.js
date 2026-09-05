const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, Header, Footer, PageNumber, PageBreak, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign
} = require('docx');

// Branding Colors
const GOLD_HEX = "C69A5A";
const DARK_HEX = "2C2C2C";
const LIGHT_BG_HEX = "FDFBF7";
const GRAY_TEXT = "4B5563";
const LIGHT_BORDER = "E5E7EB";
const WHITE_HEX = "FFFFFF";
const ACCENT_BG = "F3EFE6";

// Helper header function
const createHeader = (titleText, categoryText = "FUTURE MIND STUDIO") => {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: categoryText.toUpperCase(),
          bold: true,
          size: 20, // 10pt
          color: GOLD_HEX,
          font: "Arial"
        })
      ],
      spacing: { before: 100, after: 140 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: titleText,
          bold: true,
          size: 40, // 20pt
          color: DARK_HEX,
          font: "Arial"
        })
      ],
      spacing: { after: 360 }
    })
  ];
};

const createCardCell = (title, description, widthPercent = 48) => {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
    margins: { top: 280, bottom: 280, left: 240, right: 240 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: GOLD_HEX },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER },
      left: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER },
      right: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER },
    },
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: title, bold: true, size: 24, color: DARK_HEX, font: "Arial" })
        ],
        spacing: { after: 120 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: description, size: 20, color: GRAY_TEXT, font: "Arial" })
        ]
      })
    ]
  });
};

const createSectionFooter = (pageNo) => {
  return new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [
      new TextRun({ text: "www.futuremindstudio.com | Page ", size: 18, color: "9CA3AF", font: "Arial" }),
      new TextRun({ text: String(pageNo).padStart(2, '0'), size: 18, bold: true, color: GOLD_HEX, font: "Arial" })
    ],
    spacing: { before: 480 }
  });
};

async function buildDoc() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 22, color: "374151" }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 720, right: 720 } // 0.5 in margins for full page utilization
          }
        },
        children: [
          // ==================== PAGE 01: COVER PAGE ====================
          new Paragraph({
            children: [
              new TextRun({ text: "FUTURE MIND STUDIO", bold: true, size: 22, color: GOLD_HEX, font: "Arial" })
            ],
            spacing: { before: 200, after: 600 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "WEBSITE", bold: true, size: 64, color: DARK_HEX, font: "Arial" }),
            ],
            spacing: { after: 0 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "DEVELOPMENT", bold: true, size: 64, color: GOLD_HEX, font: "Arial" }),
            ],
            spacing: { after: 0 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "PROPOSAL", bold: true, size: 64, color: DARK_HEX, font: "Arial" }),
            ],
            spacing: { after: 360 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Building Digital Experiences That Grow Business", italics: true, size: 28, color: GRAY_TEXT, font: "Arial" })
            ],
            spacing: { after: 1400 }
          }),

          // Full-page visual callout box
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: ACCENT_BG, type: ShadingType.CLEAR },
                    margins: { top: 500, bottom: 500, left: 400, right: 400 },
                    borders: { left: { style: BorderStyle.SINGLE, size: 18, color: GOLD_HEX } },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "PREPARED FOR EXCELLENCE & DIGITAL GROWTH", bold: true, size: 22, color: GOLD_HEX })
                        ],
                        spacing: { after: 120 }
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "High-Performance Websites • Modern UI/UX • Scalable Architecture", size: 20, color: DARK_HEX })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 1400 } }),

          // Metadata Table Box at Bottom
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 280, bottom: 280, left: 240, right: 240 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Prepared for", size: 18, color: "888888" })], spacing: { after: 60 } }),
                      new Paragraph({ children: [new TextRun({ text: "ABC Textiles Pvt Ltd", bold: true, size: 24, color: DARK_HEX })] })
                    ]
                  }),
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 280, bottom: 280, left: 240, right: 240 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Proposal ID", size: 18, color: "888888" })], spacing: { after: 60 } }),
                      new Paragraph({ children: [new TextRun({ text: "FMS-2026-001", bold: true, size: 24, color: DARK_HEX })] })
                    ]
                  }),
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 280, bottom: 280, left: 240, right: 240 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Date", size: 18, color: "888888" })], spacing: { after: 60 } }),
                      new Paragraph({ children: [new TextRun({ text: "27 July 2026", bold: true, size: 24, color: DARK_HEX })] })
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(1),

          // ==================== PAGE 02: TABLE OF CONTENTS ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("TABLE OF CONTENTS"),
          ...[
            ["01", "Welcome Message"],
            ["02", "About Future Mind Studio"],
            ["03", "Why Choose Us"],
            ["04", "Our Website Packages"],
            ["05", "Recommended Package"],
            ["06", "Project Scope"],
            ["07", "Our Development Process"],
            ["08", "Project Timeline"],
            ["09", "Business Growth Services (Add-ons)"],
            ["10", "Annual Maintenance Contract (AMC)"],
            ["11", "Investment & Payment Terms"],
            ["12", "Terms & Conditions"],
            ["13", "Acceptance & Next Steps"]
          ].map(([num, title]) => new Paragraph({
            children: [
              new TextRun({ text: `${num}   `, bold: true, color: GOLD_HEX, size: 26 }),
              new TextRun({ text: title, bold: true, color: DARK_HEX, size: 24 })
            ],
            spacing: { after: 260 }
          })),
          createSectionFooter(2),

          // ==================== PAGE 03: WELCOME MESSAGE ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("WELCOME MESSAGE"),
          new Paragraph({
            children: [
              new TextRun({ text: "Thank you for considering Future Mind Studio as your digital partner.", bold: true, size: 28, color: DARK_HEX })
            ],
            spacing: { before: 200, after: 480 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "We understand your business, your goals and your vision. This proposal is our commitment to deliver a powerful digital solution that helps your business grow, build trust and generate results.", size: 24, color: GRAY_TEXT })
            ],
            spacing: { after: 480 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: ACCENT_BG },
                    margins: { top: 400, bottom: 400, left: 360, right: 360 },
                    borders: { left: { style: BorderStyle.SINGLE, size: 16, color: GOLD_HEX } },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "“Our primary goal is to turn your digital presence into your strongest business asset.”", italics: true, bold: true, size: 24, color: DARK_HEX })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "We look forward to working with you.", size: 24, color: GRAY_TEXT })
            ],
            spacing: { before: 480, after: 600 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Regards,", size: 22, color: GRAY_TEXT }),
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Future Mind Studio", bold: true, italics: true, size: 30, color: GOLD_HEX })
            ],
            spacing: { after: 400 }
          }),
          createSectionFooter(3),

          // ==================== PAGE 04: ABOUT FUTURE MIND STUDIO ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("ABOUT FUTURE MIND STUDIO"),
          new Paragraph({
            children: [
              new TextRun({ text: "Future Mind Studio is a creative digital agency helping businesses establish a strong online presence with modern web design, development and digital solutions.", size: 24, color: GRAY_TEXT })
            ],
            spacing: { after: 600 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 320, bottom: 320, left: 320, right: 320 },
                    borders: { left: { style: BorderStyle.SINGLE, size: 14, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Our Mission", bold: true, size: 26, color: DARK_HEX })], spacing: { after: 120 } }),
                      new Paragraph({ children: [new TextRun({ text: "To empower businesses with innovative digital solutions that drive growth, increase visibility, and convert visitors into loyal customers.", size: 22, color: GRAY_TEXT })] })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 320, bottom: 320, left: 320, right: 320 },
                    borders: { left: { style: BorderStyle.SINGLE, size: 14, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Our Vision", bold: true, size: 26, color: DARK_HEX })], spacing: { after: 120 } }),
                      new Paragraph({ children: [new TextRun({ text: "To become a trusted digital partner for businesses worldwide, recognized for design excellence, cutting-edge technology, and client success.", size: 22, color: GRAY_TEXT })] })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 320, bottom: 320, left: 320, right: 320 },
                    borders: { left: { style: BorderStyle.SINGLE, size: 14, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Our Values", bold: true, size: 26, color: DARK_HEX })], spacing: { after: 120 } }),
                      new Paragraph({ children: [new TextRun({ text: "Quality, Transparency, Innovation, and Customer Success guide everything we build.", size: 22, color: GRAY_TEXT })] })
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(4),

          // ==================== PAGE 05: WHY BUSINESSES CHOOSE US ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("WHY BUSINESSES CHOOSE US"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCardCell("Premium Design", "Modern, clean & result-driven designs crafted specifically for your target audience."),
                  createCardCell("Transparent Pricing", "Clear pricing structure with zero hidden charges or unexpected costs.")
                ]
              }),
              new TableRow({
                children: [
                  createCardCell("Business Focused", "Tailored solutions built directly around your revenue and growth objectives."),
                  createCardCell("Dedicated Support", "Continuous assistance and guidance with you at every single step of the journey.")
                ]
              }),
              new TableRow({
                children: [
                  createCardCell("On-Time Delivery", "Strict adherence to project schedules, respecting your business deadlines."),
                  createCardCell("Future Ready", "Scalable and modular code structure built for easy future feature additions.")
                ]
              }),
              new TableRow({
                children: [
                  createCardCell("Secure & Reliable", "Industry standard security protocols and reliable server configurations."),
                  createCardCell("Client Satisfaction", "Dedicated to delivering exceptional value—your business success is our victory.")
                ]
              })
            ]
          }),
          createSectionFooter(5),

          // ==================== PAGE 06: OUR WEBSITE PACKAGES ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("OUR WEBSITE PACKAGES"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  // Launch
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 300, bottom: 300, left: 140, right: 140 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: LIGHT_BORDER } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LAUNCH", bold: true, size: 22, color: DARK_HEX })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "₹9,999", bold: true, size: 28, color: GOLD_HEX })], spacing: { after: 200 } }),
                      ...["Up to 5 Pages", "Responsive Design", "Contact Form", "WhatsApp Integration", "Basic SEO", "15 Days Support"].map(f => new Paragraph({ children: [new TextRun({ text: "• " + f, size: 18 })], spacing: { after: 100 } }))
                    ]
                  }),
                  // Business
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: DARK_HEX, type: ShadingType.CLEAR },
                    margins: { top: 300, bottom: 300, left: 140, right: 140 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 12, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BUSINESS ★", bold: true, size: 22, color: GOLD_HEX })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "₹14,999", bold: true, size: 28, color: WHITE_HEX })], spacing: { after: 200 } }),
                      ...["Up to 10 Pages", "Premium Design", "SEO Ready", "Blog Module", "Gallery", "30 Days Support"].map(f => new Paragraph({ children: [new TextRun({ text: "• " + f, size: 18, color: WHITE_HEX })], spacing: { after: 100 } }))
                    ]
                  }),
                  // Professional
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 300, bottom: 300, left: 140, right: 140 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: LIGHT_BORDER } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PROFESSIONAL", bold: true, size: 22, color: DARK_HEX })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "₹29,999", bold: true, size: 28, color: GOLD_HEX })], spacing: { after: 200 } }),
                      ...["Up to 15 Pages", "Advanced Features", "Speed Optimization", "Lead Capture Forms", "Priority Support", "60 Days Support"].map(f => new Paragraph({ children: [new TextRun({ text: "• " + f, size: 18 })], spacing: { after: 100 } }))
                    ]
                  }),
                  // Enterprise
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 300, bottom: 300, left: 140, right: 140 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: LIGHT_BORDER } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ENTERPRISE", bold: true, size: 22, color: DARK_HEX })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "₹49,999", bold: true, size: 28, color: GOLD_HEX })], spacing: { after: 200 } }),
                      ...["Unlimited Pages", "Custom Solutions", "Integrations", "Dedicated Support", "Performance & Security", "90 Days Support"].map(f => new Paragraph({ children: [new TextRun({ text: "• " + f, size: 18 })], spacing: { after: 100 } }))
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(6),

          // ==================== PAGE 07: RECOMMENDED PACKAGE ====================
          new Paragraph({ children: [new PageBreak()] }),
          new Paragraph({ children: [new TextRun({ text: "★ RECOMMENDED PACKAGE", bold: true, size: 22, color: GOLD_HEX })] }),
          ...createHeader("BUSINESS WEBSITE PACKAGE"),
          new Paragraph({
            children: [
              new TextRun({ text: "₹14,999 ", bold: true, size: 40, color: DARK_HEX }),
              new TextRun({ text: "  |   Timeline: 7 – 10 Working Days", size: 24, color: GRAY_TEXT })
            ],
            spacing: { after: 440 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCardCell("Premium Responsive Design", "Custom tailored layout optimized for mobile, tablet & desktop screen sizes."),
                  createCardCell("Up to 10 Pages", "Home, About, Services, Portfolio, Blog, Contact, & custom subpages.")
                ]
              }),
              new TableRow({
                children: [
                  createCardCell("WhatsApp Integration", "Direct instant click-to-chat integration to convert leads quickly."),
                  createCardCell("Contact Form & Google Maps", "Interactive inquiry forms and embedded Google location map.")
                ]
              }),
              new TableRow({
                children: [
                  createCardCell("SEO Ready Structure", "On-page SEO optimization & fast loading speed configuration."),
                  createCardCell("Blog & Dynamic Content", "Easy to manage dynamic updates and company announcements.")
                ]
              }),
              new TableRow({
                children: [
                  createCardCell("30 Days Free Support", "Complete post-launch technical assistance and maintenance."),
                  createCardCell("SSL & Security Setup", "HTTPS SSL security certificate installation for safe browsing.")
                ]
              })
            ]
          }),
          createSectionFooter(7),

          // ==================== PAGE 08: PROJECT SCOPE ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("PROJECT SCOPE"),
          new Paragraph({
            children: [
              new TextRun({ text: "We don't just build websites. We build digital experiences that deliver real business results.", italics: true, size: 26, color: GRAY_TEXT })
            ],
            spacing: { after: 500 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              [
                ["Build Customer Trust", "A professional website builds immediate credibility and customer confidence."],
                ["Generate More Enquiries", "Help customers reach you easily and increase business conversion opportunities."]
              ],
              [
                ["Google Visibility", "SEO-optimized structure to help your website rank on Google search."],
                ["Mobile Friendly Experience", "Seamless and responsive user experience across all smartphone screens."]
              ],
              [
                ["Fast, Secure & Reliable", "High performance, robust security protocols, and high uptime reliability."],
                ["Future Ready", "Scalable structure designed to expand smoothly as your business grows."]
              ]
            ].flatMap(pair => new TableRow({
              children: pair.map(([title, desc]) => createCardCell("✔ " + title, desc, 48))
            }))
          }),
          createSectionFooter(8),

          // ==================== PAGE 09: DEVELOPMENT PROCESS ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("OUR DEVELOPMENT PROCESS"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              ["01", "DISCOVERY", "Understanding your business, target market, goals & technical requirements"],
              ["02", "PLANNING", "Architecting sitemap, wireframes & content strategy for smooth navigation"],
              ["03", "UI/UX DESIGN", "Creating modern, attractive, user-focused designs aligned with your brand"],
              ["04", "DEVELOPMENT", "Clean, fast, responsive & secure front-end and back-end coding"],
              ["05", "TESTING", "Comprehensive QA testing across mobile devices, browsers & speed benchmarks"],
              ["06", "LAUNCH", "Deployment to production server, DNS configuration & making your business live"],
              ["07", "SUPPORT", "Ongoing post-launch technical support, maintenance & guidance"]
            ].map(([num, step, detail]) => new TableRow({
              children: [
                new TableCell({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  shading: { fill: LIGHT_BG_HEX },
                  margins: { top: 220, bottom: 220, left: 240, right: 240 },
                  borders: { left: { style: BorderStyle.SINGLE, size: 12, color: GOLD_HEX } },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: `${num}  ${step}`, bold: true, size: 24, color: DARK_HEX }),
                        new TextRun({ text: ` — ${detail}`, size: 20, color: GRAY_TEXT })
                      ]
                    })
                  ]
                })
              ]
            }))
          }),
          createSectionFooter(9),

          // ==================== PAGE 10: PROJECT TIMELINE ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("PROJECT TIMELINE"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: DARK_HEX }, margins: { top: 200, bottom: 200, left: 240, right: 240 }, children: [new Paragraph({ children: [new TextRun({ text: "PROJECT PHASE", bold: true, size: 22, color: WHITE_HEX })] })] }),
                  new TableCell({ shading: { fill: DARK_HEX }, margins: { top: 200, bottom: 200, left: 240, right: 240 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "ESTIMATED DURATION", bold: true, size: 22, color: GOLD_HEX })] })] })
                ]
              }),
              ...[
                ["Discovery & Requirements Gathering", "1 – 2 Days"],
                ["UI/UX Design & Layout Approval", "2 – 3 Days"],
                ["Front-End & Back-End Development", "3 – 5 Days"],
                ["Quality Assurance & Device Testing", "1 – 2 Days"],
                ["Content Integration & Revisions", "1 – 2 Days"],
                ["Final Client Review & Sign-Off", "1 Day"],
                ["Domain DNS & Official Launch", "1 Day"]
              ].map(([phase, dur], idx) => new TableRow({
                children: [
                  new TableCell({ shading: { fill: idx % 2 === 0 ? WHITE_HEX : LIGHT_BG_HEX }, margins: { top: 200, bottom: 200, left: 240, right: 240 }, borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER } }, children: [new Paragraph({ children: [new TextRun({ text: phase, size: 22, color: DARK_HEX })] })] }),
                  new TableCell({ shading: { fill: idx % 2 === 0 ? WHITE_HEX : LIGHT_BG_HEX }, margins: { top: 200, bottom: 200, left: 240, right: 240 }, borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER } }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: dur, bold: true, size: 22, color: GOLD_HEX })] })] })
                ]
              }))
            ]
          }),
          new Paragraph({ spacing: { before: 400 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: ACCENT_BG },
                    margins: { top: 300, bottom: 300, left: 300, right: 300 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: GOLD_HEX }, bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD_HEX } },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "TOTAL ESTIMATED TIMELINE: 7 – 10 WORKING DAYS", bold: true, size: 26, color: DARK_HEX })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(10),

          // ==================== PAGE 11: ADD-ONS ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("BUSINESS GROWTH SERVICES (ADD-ONS)"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createCardCell("Professional Email Setup", "Custom domain-matched business email accounts."), createCardCell("Logo & Brand Suite", "Professional vector logo design & brand identity.")] }),
              new TableRow({ children: [createCardCell("Content Copywriting", "SEO-optimized business page copywriting."), createCardCell("Product Photography", "Visual styling & catalog photography guidance.")] }),
              new TableRow({ children: [createCardCell("Blog Portal Module", "Dynamic publishing platform for news & articles."), createCardCell("Additional Custom Pages", "Extra tailored pages beyond package limits.")] }),
              new TableRow({ children: [createCardCell("Google Business Profile", "Local Google Maps optimization & profile setup."), createCardCell("Payment Gateway Integration", "Online card, UPI, & net banking setup (Razorpay/Stripe).")] }),
              new TableRow({ children: [createCardCell("Online Booking System", "Interactive customer appointment scheduling engine."), createCardCell("AI Chat Assistant", "Automated smart customer inquiry lead bot.")] })
            ]
          }),
          createSectionFooter(11),

          // ==================== PAGE 12: AMC ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("ANNUAL MAINTENANCE CONTRACT (AMC)"),
          new Paragraph({
            children: [
              new TextRun({ text: "Keep your website secure, updated and performing at its best year-round.", size: 24, color: GRAY_TEXT })
            ],
            spacing: { after: 440 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  // Essential
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 300, bottom: 300, left: 160, right: 160 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: LIGHT_BORDER } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ESSENTIAL", bold: true, size: 22, color: DARK_HEX })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "₹9,999 / Yr", bold: true, size: 24, color: GOLD_HEX })], spacing: { after: 200 } }),
                      ...["Website Backup", "Security Updates", "Performance Monitoring", "Uptime Monitoring", "Technical Support", "Content Updates"].map(f => new Paragraph({ children: [new TextRun({ text: "• " + f, size: 18 })], spacing: { after: 100 } }))
                    ]
                  }),
                  // Business
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: DARK_HEX, type: ShadingType.CLEAR },
                    margins: { top: 300, bottom: 300, left: 160, right: 160 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 12, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BUSINESS ★", bold: true, size: 22, color: GOLD_HEX })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "₹19,999 / Yr", bold: true, size: 24, color: WHITE_HEX })], spacing: { after: 200 } }),
                      ...["Everything in Essential", "Priority Support", "Monthly Health Check", "Speed Optimization", "Advanced Security", "Monthly Report"].map(f => new Paragraph({ children: [new TextRun({ text: "• " + f, size: 18, color: WHITE_HEX })], spacing: { after: 100 } }))
                    ]
                  }),
                  // Premium
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX, type: ShadingType.CLEAR },
                    margins: { top: 300, bottom: 300, left: 160, right: 160 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: LIGHT_BORDER } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PREMIUM", bold: true, size: 22, color: DARK_HEX })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "₹34,999 / Yr", bold: true, size: 24, color: GOLD_HEX })], spacing: { after: 200 } }),
                      ...["Everything in Business", "Dedicated Support", "Emergency Support", "Content Updates", "Consultation", "Growth Recs"].map(f => new Paragraph({ children: [new TextRun({ text: "• " + f, size: 18 })], spacing: { after: 100 } }))
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(12),

          // ==================== PAGE 13: PAYMENT TERMS ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("INVESTMENT & PAYMENT TERMS"),
          new Paragraph({
            children: [
              new TextRun({ text: "Selected Package: BUSINESS WEBSITE PACKAGE — ₹14,999", bold: true, size: 26, color: GOLD_HEX })
            ],
            spacing: { after: 440 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX },
                    margins: { top: 360, bottom: 360, left: 280, right: 280 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "PAYMENT SCHEDULE", bold: true, size: 24, color: DARK_HEX })], spacing: { after: 200 } }),
                      new Paragraph({ children: [new TextRun({ text: "• 50% Advance ", bold: true, size: 22, color: DARK_HEX }), new TextRun({ text: "upon agreement sign-off to initiate project discovery & design.", size: 20, color: GRAY_TEXT })], spacing: { after: 160 } }),
                      new Paragraph({ children: [new TextRun({ text: "• 50% Before Launch ", bold: true, size: 22, color: DARK_HEX }), new TextRun({ text: "following final review and staging approval prior to live deployment.", size: 20, color: GRAY_TEXT })] })
                    ]
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX },
                    margins: { top: 360, bottom: 360, left: 280, right: 280 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "DELIVERABLES INCLUDED", bold: true, size: 24, color: DARK_HEX })], spacing: { after: 200 } }),
                      ...["Custom Responsive UI Design", "10 Optimized Content Pages", "30 Days Free Maintenance", "On-Page SEO Configuration", "SSL Security Installation"].map(inc => new Paragraph({ children: [new TextRun({ text: "✔ " + inc, size: 20, color: DARK_HEX })], spacing: { after: 100 } }))
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(13),

          // ==================== PAGE 14: PACKAGE COMPARISON ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("PACKAGE COMPARISON"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: DARK_HEX }, margins: { top: 160, bottom: 160, left: 140, right: 140 }, children: [new Paragraph({ children: [new TextRun({ text: "FEATURES", bold: true, size: 20, color: WHITE_HEX })] })] }),
                  new TableCell({ shading: { fill: DARK_HEX }, margins: { top: 160, bottom: 160, left: 140, right: 140 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LAUNCH", bold: true, size: 18, color: WHITE_HEX })] })] }),
                  new TableCell({ shading: { fill: GOLD_HEX }, margins: { top: 160, bottom: 160, left: 140, right: 140 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BUSINESS", bold: true, size: 18, color: WHITE_HEX })] })] }),
                  new TableCell({ shading: { fill: DARK_HEX }, margins: { top: 160, bottom: 160, left: 140, right: 140 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PRO", bold: true, size: 18, color: WHITE_HEX })] })] }),
                  new TableCell({ shading: { fill: DARK_HEX }, margins: { top: 160, bottom: 160, left: 140, right: 140 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ENTERPRISE", bold: true, size: 18, color: WHITE_HEX })] })] })
                ]
              }),
              ...[
                ["Responsive Design", "✓", "✓", "✓", "✓"],
                ["Up to Pages", "5 Pages", "10 Pages", "15 Pages", "Unlimited"],
                ["Contact Form", "✓", "✓", "✓", "✓"],
                ["WhatsApp Integration", "✓", "✓", "✓", "✓"],
                ["SEO Configuration", "Basic", "Ready", "Advanced", "Full Suite"],
                ["Blog Module", "✗", "✓", "✓", "✓"],
                ["Gallery Module", "✗", "✓", "✓", "✓"],
                ["Custom Features", "✗", "✗", "✓", "✓"],
                ["Lead Capture Forms", "✗", "✗", "✓", "✓"],
                ["Priority Support", "✗", "✗", "✓", "✓"],
                ["Support Duration", "15 Days", "30 Days", "60 Days", "90 Days"]
              ].map(([feat, l, b, p, e]) => new TableRow({
                children: [
                  new TableCell({ margins: { top: 120, bottom: 120, left: 140, right: 140 }, borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER } }, children: [new Paragraph({ children: [new TextRun({ text: feat, size: 20, color: DARK_HEX })] })] }),
                  new TableCell({ margins: { top: 120, bottom: 120, left: 140, right: 140 }, borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER } }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: l, size: 20, color: l === '✓' ? GOLD_HEX : GRAY_TEXT })] })] }),
                  new TableCell({ shading: { fill: LIGHT_BG_HEX }, margins: { top: 120, bottom: 120, left: 140, right: 140 }, borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER } }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: b, bold: true, size: 20, color: GOLD_HEX })] })] }),
                  new TableCell({ margins: { top: 120, bottom: 120, left: 140, right: 140 }, borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER } }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p, size: 20, color: p === '✓' ? GOLD_HEX : GRAY_TEXT })] })] }),
                  new TableCell({ margins: { top: 120, bottom: 120, left: 140, right: 140 }, borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_BORDER } }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: e, size: 20, color: e === '✓' ? GOLD_HEX : GRAY_TEXT })] })] })
                ]
              }))
            ]
          }),
          createSectionFooter(14),

          // ==================== PAGE 15: TERMS & CONDITIONS ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("TERMS & CONDITIONS"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              "1. Project timeline starts strictly after receiving all required assets, content & client approvals.",
              "2. A non-refundable 50% advance payment is required to initiate design & development work.",
              "3. The remaining 50% final payment is due prior to website deployment to live server.",
              "4. Domain registration and hosting server renewal fees are billed annually.",
              "5. Client is responsible for providing all copy text, logos, high-res images, and product details.",
              "6. Any additional feature requests or scope modifications will be quoted separately.",
              "7. Future Mind Studio reserves the right to feature the completed project in our portfolio."
            ].map(term => new TableRow({
              children: [
                new TableCell({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  shading: { fill: LIGHT_BG_HEX },
                  margins: { top: 220, bottom: 220, left: 240, right: 240 },
                  borders: { left: { style: BorderStyle.SINGLE, size: 10, color: GOLD_HEX } },
                  children: [
                    new Paragraph({ children: [new TextRun({ text: term, size: 22, color: DARK_HEX })] })
                  ]
                })
              ]
            }))
          }),
          createSectionFooter(15),

          // ==================== PAGE 16: ACCEPTANCE & NEXT STEPS ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("ACCEPTANCE & NEXT STEPS"),
          new Paragraph({
            children: [
              new TextRun({ text: "I am pleased to accept this proposal and authorize Future Mind Studio to begin the project as detailed.", size: 24, color: DARK_HEX })
            ],
            spacing: { before: 200, after: 600 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX },
                    margins: { top: 400, bottom: 400, left: 360, right: 360 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Client Name:   __________________________________________________", size: 22, color: DARK_HEX })], spacing: { after: 300 } }),
                      new Paragraph({ children: [new TextRun({ text: "Designation:   __________________________________________________", size: 22, color: DARK_HEX })], spacing: { after: 300 } }),
                      new Paragraph({ children: [new TextRun({ text: "Signature:     __________________________________________________", size: 22, color: DARK_HEX })], spacing: { after: 300 } }),
                      new Paragraph({ children: [new TextRun({ text: "Date:          __________________________________________________", size: 22, color: DARK_HEX })] })
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(16),

          // ==================== PAGE 17: CALL TO ACTION ====================
          new Paragraph({ children: [new PageBreak()] }),
          new Paragraph({ children: [new TextRun({ text: "FUTURE MIND STUDIO", bold: true, size: 22, color: GOLD_HEX })], spacing: { before: 400, after: 600 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "Let's Build Something ", bold: true, size: 52, color: DARK_HEX }),
              new TextRun({ text: "Amazing", bold: true, italics: true, size: 52, color: GOLD_HEX }),
              new TextRun({ text: " Together", bold: true, size: 52, color: DARK_HEX })
            ],
            spacing: { after: 480 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: ACCENT_BG },
                    margins: { top: 500, bottom: 500, left: 400, right: 400 },
                    borders: { left: { style: BorderStyle.SINGLE, size: 16, color: GOLD_HEX } },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "We don't just build websites. We build digital experiences that help your business grow, scale, and succeed in today's competitive landscape.", size: 26, color: DARK_HEX })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(17),

          // ==================== PAGE 18: GET IN TOUCH ====================
          new Paragraph({ children: [new PageBreak()] }),
          ...createHeader("GET IN TOUCH"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX },
                    margins: { top: 360, bottom: 360, left: 360, right: 360 },
                    borders: { left: { style: BorderStyle.SINGLE, size: 14, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "📞   Phone:  ", bold: true, size: 26, color: DARK_HEX }), new TextRun({ text: "+91 12345 67890", bold: true, size: 26, color: GOLD_HEX })], spacing: { after: 240 } }),
                      new Paragraph({ children: [new TextRun({ text: "✉   Email:  ", bold: true, size: 26, color: DARK_HEX }), new TextRun({ text: "hello@futuremindstudio.com", bold: true, size: 26, color: GOLD_HEX })], spacing: { after: 240 } }),
                      new Paragraph({ children: [new TextRun({ text: "🌐   Website:", bold: true, size: 26, color: DARK_HEX }), new TextRun({ text: "www.futuremindstudio.com", bold: true, size: 26, color: GOLD_HEX })], spacing: { after: 240 } }),
                      new Paragraph({ children: [new TextRun({ text: "📍   Address:", bold: true, size: 26, color: DARK_HEX }), new TextRun({ text: "123, Business Street, Tirupur - 641601, Tamil Nadu, India", size: 22, color: GRAY_TEXT })], spacing: { after: 280 } }),
                      new Paragraph({ children: [new TextRun({ text: "📲   Scan QR Code to connect directly with our team on WhatsApp", italics: true, size: 20, color: GRAY_TEXT })] })
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(18),

          // ==================== PAGE 19: THANK YOU ====================
          new Paragraph({ children: [new PageBreak()] }),
          new Paragraph({ children: [new TextRun({ text: "FUTURE MIND STUDIO", bold: true, size: 22, color: GOLD_HEX })], spacing: { before: 400, after: 600 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "THANK YOU", bold: true, size: 64, color: DARK_HEX })
            ],
            spacing: { after: 120 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "for considering Future Mind Studio", italics: true, size: 30, color: GOLD_HEX })
            ],
            spacing: { after: 800 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX },
                    margins: { top: 320, bottom: 320, left: 200, right: 200 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quality", bold: true, size: 26, color: DARK_HEX })], spacing: { after: 100 } }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "We deliver digital excellence", size: 20, color: GRAY_TEXT })] })
                    ]
                  }),
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX },
                    margins: { top: 320, bottom: 320, left: 200, right: 200 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Trust", bold: true, size: 26, color: DARK_HEX })], spacing: { after: 100 } }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "We build long-term relationships", size: 20, color: GRAY_TEXT })] })
                    ]
                  }),
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    shading: { fill: LIGHT_BG_HEX },
                    margins: { top: 320, bottom: 320, left: 200, right: 200 },
                    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD_HEX } },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Growth", bold: true, size: 26, color: DARK_HEX })], spacing: { after: 100 } }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "We grow together", size: 20, color: GRAY_TEXT })] })
                    ]
                  })
                ]
              })
            ]
          }),
          createSectionFooter(19)
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  
  // Try main file path first, fallback to FullPage file path if main is locked
  let outputPath = path.join(__dirname, 'Future_Mind_Studio_Website_Development_Proposal_FullPage.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document generated successfully at: ${outputPath}`);

  try {
    const mainPath = path.join(__dirname, 'Future_Mind_Studio_Website_Development_Proposal.docx');
    fs.writeFileSync(mainPath, buffer);
    console.log(`Also saved to primary path: ${mainPath}`);
  } catch (err) {
    console.log("Primary file is currently locked/open in another program, saved to FullPage filename instead.");
  }
}

buildDoc().catch(err => {
  console.error("Error generating document:", err);
  process.exit(1);
});
