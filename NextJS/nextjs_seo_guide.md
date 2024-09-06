

# SEO Components

## Overview

The `src/components/seo` folder is dedicated to housing all SEO-related components within our project. These components are responsible for managing metadata, structured data, Open Graph tags, Twitter cards, canonical links, and other SEO-related elements across the application. The primary goal of these components is to ensure that your application is optimized for search engines, providing a consistent and maintainable approach to handling SEO.

## What Should Be in the `seo` Folder

### 1. **PageMetaData Component**
   - **Purpose:** Manages the meta tags for pages such as title, description, keywords, author, Open Graph tags, and Twitter cards.
   - **Example:**
     ```tsx
     // src/components/seo/PageMetaData.component.tsx
     import React from 'react';
     import Head from 'next/head';

     interface PageMetaDataProps {
       companyName?: string;
       pageName?: string;
       description?: string;
       keywords?: string;
       author?: string;
       ogTitle?: string;
       ogDescription?: string;
       ogImage?: string;
       ogUrl?: string;
       twitterCard?: string;
     }

     export function PageMetaData(props: PageMetaDataProps) {
       const {
         companyName = "Bridge Financial",
         pageName = "",
         description = "Bridge offers expert consulting, real-time business valuation, and technology solutions to optimize and sell your business for maximum value.",
         keywords,
         author,
         ogTitle,
         ogDescription,
         ogImage,
         ogUrl,
         twitterCard
       } = props;

       const combinedTitle = `${companyName}${pageName ? ` - ${pageName}` : ''}`;
       const truncatedDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;

       return (
         <Head>
           <title>{combinedTitle}</title>
           <meta name="description" content={truncatedDescription} />
           {keywords && <meta name="keywords" content={keywords} />}
           {author && <meta name="author" content={author} />}
           {ogTitle && <meta property="og:title" content={ogTitle} />}
           {ogDescription && <meta property="og:description" content={ogDescription} />}
           {ogImage && <meta property="og:image" content={ogImage} />}
           {ogUrl && <meta property="og:url" content={ogUrl} />}
           {twitterCard && <meta name="twitter:card" content={twitterCard} />}
         </Head>
       );
     }

     export default PageMetaData;
     ```

### 2. **Structured Data Component**
   - **Purpose:** Adds structured data (JSON-LD) to your pages for better search engine understanding.
   - **Example:**
     ```tsx
     // src/components/seo/StructuredData.component.tsx
     import React from 'react';
     import Head from 'next/head';

     interface StructuredDataProps {
       jsonLd: Record<string, any>;
     }

     export const StructuredData: React.FC<StructuredDataProps> = ({ jsonLd }) => (
       <Head>
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
         />
       </Head>
     );

     export default StructuredData;
     ```

### 3. **Open Graph Component**
   - **Purpose:** Manages Open Graph meta tags to enhance link previews on social platforms.
   - **Example:**
     ```tsx
     // src/components/seo/OpenGraph.component.tsx
     import React from 'react';
     import Head from 'next/head';

     interface OpenGraphProps {
       title: string;
       description: string;
       image: string;
       url: string;
     }

     export const OpenGraph: React.FC<OpenGraphProps> = ({ title, description, image, url }) => (
       <Head>
         <meta property="og:title" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content={image} />
         <meta property="og:url" content={url} />
       </Head>
     );

     export default OpenGraph;
     ```

### 4. **Twitter Card Component**
   - **Purpose:** Manages Twitter card meta tags to enhance link previews on Twitter.
   - **Example:**
     ```tsx
     // src/components/seo/TwitterCard.component.tsx
     import React from 'react';
     import Head from 'next/head';

     interface TwitterCardProps {
       title: string;
       description: string;
       image: string;
     }

     export const TwitterCard: React.FC<TwitterCardProps> = ({ title, description, image }) => (
       <Head>
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={title} />
         <meta name="twitter:description" content={description} />
         <meta name="twitter:image" content={image} />
       </Head>
     );

     export default TwitterCard;
     ```

### 5. **Canonical Link Component**
   - **Purpose:** Ensures that search engines recognize the preferred URL for a page.
   - **Example:**
     ```tsx
     // src/components/seo/CanonicalLink.component.tsx
     import React from 'react';
     import Head from 'next/head';

     interface CanonicalLinkProps {
       href: string;
     }

     export const CanonicalLink: React.FC<CanonicalLinkProps> = ({ href }) => (
       <Head>
         <link rel="canonical" href={href} />
       </Head>
     );

     export default CanonicalLink;
     ```

### 6. **Robots.txt Component**
   - **Purpose:** Manages the robots.txt file to control how search engines index your site.
   - **Example:**
     ```tsx
     // src/components/seo/RobotsTxt.component.tsx
     import React from 'react';
     import Head from 'next/head';

     export const RobotsTxt: React.FC = () => (
       <Head>
         <meta name="robots" content="index, follow" />
       </Head>
     );

     export default RobotsTxt;
     ```

## What Should NOT Be in the `seo` Folder

- **Styling**: The `seo` folder should not include any CSS or styling-related files. SEO components should focus solely on metadata and non-visual elements.
- **Predefined Markup Components (Non-Meta Related)**: Components involving visual markup or UI elements (e.g., buttons, modals) should not be included. These belong in the `design-system` or other appropriate UI component folders.
- **Non-SEO Related Logic**: Any logic unrelated to SEO, such as data fetching, state management, or application logic, should not reside in this folder.

## General Rules to Follow

1. **Separation of Concerns**: Keep SEO logic separate from UI logic. The `seo` folder should focus exclusively on metadata and search engine optimization components.
2. **Reusability**: Ensure that components in the `seo` folder are reusable across different pages and contexts.
3. **No Styling**: Avoid including any CSS or styling logic in SEO components. Focus on managing meta tags and structured data.
4. **Next.js Compatibility**: Use Next.js's `Head` component for injecting metadata into the HTML `<head>` section efficiently.

## The Importance of SEO for Startups and Long-Term Revenue

### **1. Visibility and Discoverability**

For startups, especially those with limited marketing budgets, SEO is critical for increasing visibility and discoverability. Properly optimized pages are more likely to rank higher in search engine results, which can drive organic traffic to your site without the ongoing cost of paid advertising.

### **2. Building Trust and Credibility**

High search engine rankings are often associated with credibility and trustworthiness. When your site appears at the top of search results, potential customers are more likely to perceive your business as a leader in the industry. This can be particularly valuable for startups trying to establish a foothold in a competitive market.

### **3. Cost Efficiency**

Unlike paid advertising, which requires continuous investment, SEO provides long-term benefits. Once your pages are optimized and ranking well, they can continue to attract traffic without additional costs. This makes SEO a cost-effective strategy for generating leads and sales over time.

### **4. Long-Term Revenue Generation**

SEO isn't just about driving traffic; it's about attracting the right kind of traffic. By targeting specific keywords and optimizing for search intent, you can attract visitors who are more likely to convert into customers, thus driving long-term revenue growth. For startups, this can be a key factor in achieving sustainable growth.

## Why Reusable, Tested Components Matter

### **1. Consistency Across the Application**

Reusable components ensure that your SEO implementation is consistent across the entire application. This consistency is important not only for user experience but also for search engines, which value consistent and well-structured metadata.

### **2. Reduced Maintenance Overhead**

When you have reusable components that have been thoroughly tested, you reduce the risk of bugs and inconsistencies. If changes are needed (e.g., updating meta tags or structured data formats), you can make those changes in one place, and they will be reflected across the entire application. This greatly reduces maintenance overhead and the potential for errors.

### **3. Scalability**

As your application grows, the ability to reuse well-tested components becomes increasingly important. It allows you to scale your SEO efforts efficiently without needing to rewrite or duplicate code. This is especially important for startups,

 where resources are often limited, and efficiency is key.

## How to Use SEO Components with Next.js's App Router

### 1. **Using the PageMetaData Component**

In your page component, import and use the `PageMetaData` component to set up the meta tags for that page:

```tsx
// src/app/page.tsx
import React from 'react';
import PageMetaData from '@/components/seo/PageMetaData.component';

export default function HomePage() {
  return (
    <>
      <PageMetaData 
        pageName="Home"
        description="Welcome to Bridge Financial, where we offer expert consulting services."
      />
      <div>
        <h1>Welcome to the Home Page</h1>
      </div>
    </>
  );
}
```

### 2. **Using OpenGraph and Twitter Card Components**

You can combine different SEO components like `OpenGraph` and `TwitterCard` to handle specific social media metadata:

```tsx
// src/app/about/page.tsx
import React from 'react';
import PageMetaData from '@/components/seo/PageMetaData.component';
import OpenGraph from '@/components/seo/OpenGraph.component';
import TwitterCard from '@/components/seo/TwitterCard.component';

export default function AboutPage() {
  return (
    <>
      <PageMetaData pageName="About Us" />
      <OpenGraph 
        title="About Bridge Financial"
        description="Learn more about Bridge Financial, our mission, and our team."
        image="/assets/images/bridge-financial.png"
        url="https://bridge.financial/about"
      />
      <TwitterCard 
        title="About Bridge Financial"
        description="Learn more about Bridge Financial, our mission, and our team."
        image="/assets/images/bridge-financial-twitter.png"
      />
      <div>
        <h1>About Us</h1>
        <p>Bridge Financial offers...</p>
      </div>
    </>
  );
}
```

### 3. **Integrating with Structured Data**

For pages that need structured data, you can include the `StructuredData` component like so:

```tsx
// src/app/contact/page.tsx
import React from 'react';
import PageMetaData from '@/components/seo/PageMetaData.component';
import StructuredData from '@/components/seo/StructuredData.component';

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bridge Financial",
    "url": "https://bridge.financial",
    "logo": "https://bridge.financial/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-5555",
      "contactType": "Customer Service"
    }
  };

  return (
    <>
      <PageMetaData pageName="Contact Us" />
      <StructuredData jsonLd={jsonLd} />
      <div>
        <h1>Contact Us</h1>
        <p>Reach out to Bridge Financial...</p>
      </div>
    </>
  );
}
```

