// import React from 'react';
// import { getBlogPosts } from '@/services/blog';
// import BlogContent from '@/components/blog/blog-content';
// // import { Metadata } from 'next';

// // Define the params type separately
// type TagParams = {
//   tag: string;
// };


// // export async function generateMetadata({ params }: { params: TagParams }): Promise<Metadata> {
// //   const tag = decodeURIComponent(params.tag);
// //   return {
// //     title: `Posts tagged with "${tag}" | Majestic Blog`,
// //     description: `Browse all blog posts tagged with "${tag}" on Majestic Blog.`,
// //   };
// // }

// export default async function TagPage({ params }: Props) {
//   const tag = decodeURIComponent(params.tag);
//   const allPosts = await getBlogPosts();

//   // Filter posts by tag
//   const filteredPosts = allPosts.filter(post => 
//     post.tags.split(',').map(t => t.trim()).includes(tag)
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Posts tagged with &quot;{tag}&quot;</h1>
//       <BlogContent posts={filteredPosts} />
//     </div>
//   );
// } 

import React from 'react';
import { getBlogPosts } from '@/services/blog';
import BlogContent from '@/components/blog/blog-content';

// Define the params type for the page
type Props = {
  params: Promise<{ tag: string }>
}

export default async function TagPage({ params }: Props) {
  // Resolve the params promise
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  const allPosts = await getBlogPosts();

  // Filter posts by tag
  const filteredPosts = allPosts.filter(post =>
    post.tags.split(',').map(t => t.trim()).includes(tag)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts tagged with &quot;{tag}&quot;</h1>
      <BlogContent posts={filteredPosts} />
    </div>
  );
}

