import React from 'react';

const SeoJsonLd = () => {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Godzilla Infrastructure AI",
        "url": "https://godzillaai.dev",
        "logo": "https://godzillaai.dev/images/enterprise/godzilla_icon.png",
        "sameAs": [
            "https://twitter.com/godzillaai",
            "https://github.com/godzillaai"
        ],
        "description": "Enterprise-grade infrastructure for multi-model AI development and production software engineering."
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Godzilla AI",
        "operatingSystem": "macOS, Windows, Linux",
        "applicationCategory": "DeveloperApplication",
        "description": "Multi-Model AI Development Platform for Production Systems. Build secure, scalable applications with unified context.",
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "0",
            "highPrice": "99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Godzilla Infrastructure AI"
            }
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is Godzilla AI secure?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Godzilla AI is designed with an isolated local runtime architecture, ensuring proprietary source code never leaves your infrastructure."
                }
            },
            {
                "@type": "Question",
                "name": "Does it support multiple AI models?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Godzilla AI supports seamless orchestration across leading models including GPT-4, Claude 3, and Llama 3."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
};

export default SeoJsonLd;
