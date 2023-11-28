import Calendar from '@/components/Calendar';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main style={{ position: 'relative', zIndex: 1000000000, background: '#000000' }}>
      <Header category="App" title="Calendar" />
      <Calendar />
    </main>
  );
}
