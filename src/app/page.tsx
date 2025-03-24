import { Card } from './components/Card';
import { CardGrid } from './components/CardGrid';
import { Header } from './components/Header';
import { ThreadCount } from './components/ThreadCount';
import { ScraperButton } from './components/ScraperButton';
import { SummarizerButton } from './components/SummarizerButton';
import { AntisemitismStats } from './components/AntisemitismStats';
import StagePost from './components/StagePost';
import { Card3 } from './components/Card3';
import Card4 from './components/Card4';
import Card6 from './components/Card6';
import TopLinkDomains from './components/TopLinkDomains';
import RareFlags from './components/RareFlags';
import CommonFlags from './components/CommonFlags';
import { LastScrapeTime } from './components/LastScrapeTime';
import ArticleCard from './components/ArticleCard';
import styles from './page.module.css';

type CardType = 'content' | 'control' | 'status';

interface BaseCard {
  id: string;
  type: CardType;
  title: string;
}

interface ContentCard extends BaseCard {
  type: 'content';
  content: string;
}

interface ControlCard extends BaseCard {
  type: 'control';
  component: 'scraper';
}

interface StatusCard extends BaseCard {
  type: 'status';
  component: 'thread-count';
}

type CardItem = ContentCard | ControlCard | StatusCard;

const CardContent: React.FC<{ card: CardItem }> = ({ card }) => {
  switch (card.type) {
    case 'content':
      if (card.id === 'content-0') {
        return <AntisemitismStats />;
      }
      if (card.id === 'content-1') {
        return (
          <>
            <h2>{card.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <StagePost position="top" cardType="gets" />
              <StagePost position="bottom" cardType="gets" />
            </div>
          </>
        );
      }
      if (card.id === 'content-2') {
        return <Card3 />;
      }
      if (card.id === 'content-3') {
        return <Card4 />;
      }
      if (card.id === 'content-4') {
        return (
          <>
            <h2>{card.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <StagePost position="top" cardType="insights" />
              <StagePost position="middle" cardType="insights" />
              <StagePost position="bottom" cardType="insights" />
            </div>
          </>
        );
      }
      if (card.id === 'content-5') {
        return <Card6 />;
      }
      if (card.id === 'content-6') {
        return (
          <>
            <h2>{card.title}</h2>
            <TopLinkDomains />
          </>
        );
      }
      if (card.id === 'content-8') {
        return (
          <>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{card.title}</h2>
            <RareFlags />
          </>
        );
      }
      if (card.id === 'content-9') {
        return (
          <>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{card.title}</h2>
            <ThreadCount />
          </>
        );
      }
      if (card.id === 'content-11') {
        return (
          <>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{card.title}</h2>
            <CommonFlags />
          </>
        );
      }
      if (card.id === 'content-12') {
        return <ArticleCard />;
      }
      if (card.id.startsWith('content-') && parseInt(card.id.split('-')[1]) >= 13 && parseInt(card.id.split('-')[1]) <= 23) {
        const articleIndex = parseInt(card.id.split('-')[1]) - 12;
        if (parseInt(card.id.split('-')[1]) === 22) {
          return null;
        }
        return <ArticleCard index={articleIndex} />;
      }
      if (card.id === 'content-24') {
        return <ArticleCard index={10} />;
      }
      return (
        <>
          <h2>{card.title}</h2>
          {card.id !== 'content-9' && <p>{card.content}</p>}
        </>
      );
    case 'control':
      return (
        <>
          <LastScrapeTime />
          <div>
            <ScraperButton />
            <div style={{ marginTop: '1rem' }}>
              <SummarizerButton />
            </div>
          </div>
        </>
      );
    case 'status':
      return (
        <>
          <h2>{card.title}</h2>
          <ThreadCount />
        </>
      );
  }
};

export default function Home() {
  // Regular content cards (first 25 cards)
  const contentCards: ContentCard[] = Array.from({ length: 25 }, (_, i) => ({
    id: `content-${i}`,
    type: 'content',
    title: i === 0 ? 'Antisemitism Per Post' : 
           i === 1 ? 'Most Significant GETs' :
           i === 4 ? 'Key Insights' :
           i === 6 ? 'Top Link Domains' :
           i === 8 ? 'Rarest Flags' :
           i === 9 ? 'Thread Count' :
           i === 11 ? 'Most Common Flags' :
           i === 12 ? '' :
           (i >= 13 && i <= 23) || i === 24 ? '' :  // Clear titles for all article cards
           `Card ${i + 1}`,
    content: i === 0 ? '9.4% Medium' : 
             i === 1 ? '' :
             i === 4 ? '' :
             i === 6 ? '' :
             i === 8 ? '' :
             i === 9 ? '' :
             i === 11 ? '' :
             i === 12 ? '' :
             i >= 13 ? '' :  // Clear content for all new cards
             'Sample content for this card. Will be replaced with real data.'
  }));

  // Thread count card (14th card)
  const threadCountCard: StatusCard = {
    id: 'thread-count',
    type: 'status',
    title: 'Card 14',
    component: 'thread-count'
  };

  // Scraper control card (15th card)
  const scraperCard: ControlCard = {
    id: 'scraper-control',
    type: 'control',
    title: '',
    component: 'scraper'
  };

  // Combine all cards in the same order as before
  const cardLayout: CardItem[] = [
    ...contentCards,
    threadCountCard,
    scraperCard
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <CardGrid>
          {cardLayout.map((card, index) => (
            <Card key={card.id} className={`
              ${index === 0 ? styles.pinkCard : ''}
              ${index === 1 ? styles.neonCard : ''}
              ${index === 3 ? styles.cyanCard : ''}
              ${index === 4 ? styles.orangeCard : ''}
              ${index === 6 ? styles.purpleCard : ''}
              ${index === 9 ? styles.blackCard : ''}
              ${index === 12 ? styles.neonGreenCard : ''}
              ${index === 14 ? styles.blackCard : ''}
              ${index === 15 ? styles.brightBlueCard : ''}
              ${index === 16 ? styles.magentaCard : ''}
              ${index === 17 ? styles.goldCard : ''}
              ${index === 18 ? styles.indigoCard : ''}
              ${index === 19 ? styles.limeCard : ''}
              ${index === 20 ? styles.crimsonCard : ''}
              ${index === 21 ? styles.turquoiseCard : ''}
              ${index === 22 ? styles.violetCard : ''}
              ${index === 23 ? styles.goldCard : ''}
              ${index === 24 ? styles.purpleCard : ''}
            `.trim()}>
              <CardContent card={{...card, title: index === 14 ? '' : card.title}} />
            </Card>
          ))}
        </CardGrid>
      </main>
    </>
  );
}
