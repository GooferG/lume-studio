export type WorkDisplayType = 'live-preview' | 'before-after' | 'static';

export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  cover: string;
  stack: string[];
  coverPosition?: 'center' | 'top' | 'bottom';
  displayType?: WorkDisplayType;
  liveUrl?: string;
  posterImage?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
};
