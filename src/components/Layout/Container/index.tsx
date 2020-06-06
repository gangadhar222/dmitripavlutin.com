import * as React from 'react';

import 'styles/index.scss';

import Footer from 'components/Layout/Footer';
import LayoutHeader from 'components/Layout/Header';
import LayoutMetaTags from 'components/Layout/Meta/Tags';

interface LayoutContainerProps {
  children: React.ReactNode;
  siteInfo: SiteInfo;
  authorInfo: AuthorInfo;
  authorProfilePicture: FixedImage;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export default function LayoutContainer({
  children,
  siteInfo,
  authorInfo,
  authorProfilePicture,
  leftSidebar = null,
  rightSidebar = null,
}: LayoutContainerProps) {
  return (
    <>
      <LayoutMetaTags siteInfo={siteInfo} />
      <LayoutHeader authorProfilePicture={authorProfilePicture} siteInfo={siteInfo} />
      <div className="flex h-full">
        <main className="order-2 w-full max-w-3xl flex-shrink-0 mx-auto px-4">{children}</main>
        <aside className="order-1 w-80 flex-grow flex-shrink hidden lg:block">{leftSidebar}</aside>
        <aside className="order-2 w-80 flex-grow flex-shrink-0 hidden lg:block">{rightSidebar}</aside>
      </div>
      <Footer authorInfo={authorInfo} />
    </>
  );
}
