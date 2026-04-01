//rota para acessar a página: /wallet
'use client';
import { GlassPanel } from '@/app/components/glass/GlassPanel';

const CRYPTOS = [
  {name: 'Bitcoin', symbol: 'BTC', value: 'R$ 353.909,74', change: '-0.15%', positive: false },
  {name: 'Ethereum', symbol: 'ETH', value: 'R$ 11.004,21', change: '0.64%', positive: true },
  {name: 'Solana', symbol: 'SOL', value: 'R$ 429,61', change: '-0.48%', positive: false},
]
const NEWS = [
        {
        title: 'Bitcoin pode subir ou despencar no próximo trimestre',
        description: 'Analistas apontam possível alta até US$84 mil ou queda até US$50 mil',
        impact: 'neutral',
        date: 'Ontem',
        url: 'https://br.beincrypto.com/bitcoin-previsao-proximo-trimestre-84-mil-50-mil/'
        },
        {title: 'Mercado Livre encerra Mercado Coin',
        description: 'Fintech decide encerrar sua criptomoeda lançada em 2022',
        impact: 'negative',
        date: '31/03/2026',
        url: 'https://br.investing.com/news/cryptocurrency-news/fintech-do-mercado-livre-encerra-sua-criptomoeda-mercado-coin-1886531'
        }
]
        

function Positive(){  //svg do gráfico positivo
  return(
    <svg
      width="120"
      height="40"
      viewBox="0 0 260 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
      className="w-[190px] h-[55px]"
    >
      <path
        d="M56.6198 33.6488L57.3901 31.8031L56.3942 31.3874L55.5 31.9916L56.6198 33.6488ZM114.12 57.6488L113.349 59.4945L114.373 59.9217L115.277 59.2798L114.12 57.6488ZM129.62 46.6488L128.654 44.8976L128.555 44.9523L128.462 45.0178L129.62 46.6488ZM173.12 22.6488V20.6488H172.605L172.154 20.8976L173.12 22.6488ZM209.12 22.6488V24.6488H209.47L209.799 24.5299L209.12 22.6488ZM246.93 10.4986C247.4 9.49872 246.969 8.30767 245.97 7.83833L229.675 0.190001C228.675 -0.279338 227.484 0.150764 227.015 1.15066C226.546 2.15056 226.976 3.34161 227.976 3.81095L242.459 10.6095L235.661 25.0933C235.192 26.0932 235.622 27.2842 236.622 27.7535C237.622 28.2229 238.813 27.7928 239.282 26.7929L246.93 10.4986ZM1.11975 71.1488L2.23947 72.806L57.7395 35.306L56.6198 33.6488L55.5 31.9916L3.61204e-05 69.4916L1.11975 71.1488ZM56.6198 33.6488L55.8494 35.4945L113.349 59.4945L114.12 57.6488L114.89 55.8031L57.3901 31.8031L56.6198 33.6488ZM114.12 57.6488L115.277 59.2798L130.777 48.2798L129.62 46.6488L128.462 45.0178L112.962 56.0178L114.12 57.6488ZM129.62 46.6488L130.586 48.4L174.086 24.4L173.12 22.6488L172.154 20.8976L128.654 44.8976L129.62 46.6488ZM173.12 22.6488V24.6488H209.12V22.6488V20.6488H173.12V22.6488ZM209.12 22.6488L209.799 24.5299L245.799 11.5299L245.12 9.6488L244.44 7.7677L208.44 20.7677L209.12 22.6488Z"
        fill="#2FBD04"
      />
      <line
        x1="259.12"
        y1="36.5"
        x2="1.11975"
        y2="36.5"
        stroke="#BDBDBD"
      />
    </svg>
  );
}

function Negative(){  //svg do gráfico negativo
  return(
    <svg
      width="120"
      height="40"
      viewBox="0 0 260 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
      className="w-[190px] h-[55px]"
    >
      <path
        d="M56.6198 39.6488L57.3901 41.4945L56.3942 41.9102L55.5 41.306L56.6198 39.6488ZM114.12 15.6488L113.349 13.8031L114.373 13.3759L115.277 14.0178L114.12 15.6488ZM129.62 26.6488L128.654 28.4L128.555 28.3453L128.462 28.2798L129.62 26.6488ZM173.12 50.6488V52.6488H172.605L172.154 52.4L173.12 50.6488ZM209.12 50.6488V48.6488H209.47L209.799 48.7677L209.12 50.6488ZM246.93 62.799C247.4 63.7989 246.969 64.9899 245.97 65.4593L229.675 73.1076C228.675 73.577 227.484 73.1469 227.015 72.147C226.546 71.1471 226.976 69.956 227.976 69.4867L242.459 62.6882L235.661 48.2043C235.192 47.2044 235.622 46.0134 236.622 45.544C237.622 45.0747 238.813 45.5048 239.282 46.5047L246.93 62.799ZM1.11975 2.1488L2.23947 0.491577L57.7395 37.9916L56.6198 39.6488L55.5 41.306L3.61204e-05 3.80598L1.11975 2.1488ZM56.6198 39.6488L55.8494 37.8031L113.349 13.8031L114.12 15.6488L114.89 17.4945L57.3901 41.4945L56.6198 39.6488ZM114.12 15.6488L115.277 14.0178L130.777 25.0178L129.62 26.6488L128.462 28.2798L112.962 17.2798L114.12 15.6488ZM129.62 26.6488L130.586 24.8976L174.086 48.8976L173.12 50.6488L172.154 52.4L128.654 28.4L129.62 26.6488ZM173.12 50.6488V48.6488H209.12V50.6488V52.6488H173.12V50.6488ZM209.12 50.6488L209.799 48.7677L245.799 61.7677L245.12 63.6488L244.44 65.5299L208.44 52.5299L209.12 50.6488Z"
        fill="#CF0003"
      />
      <line
        x1="259.12"
        y1="36.5"
        x2="1.11975"
        y2="36.5"
        stroke="#BDBDBD"
      />
    </svg>
  );
}

function ArrowUp() { 
  return (
    <svg width="14" height="14" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7844 0C16.455 8.2506e-06 16.9982 0.544244 16.9982 1.21484V10.9287C16.998 11.5991 16.4646 12.1426 15.7941 12.1426C15.1236 12.1426 14.5707 11.5991 14.5705 10.9287V4.14648L2.07244 16.6445C1.59837 17.1184 0.829804 17.1183 0.355642 16.6445C-0.118547 16.1703 -0.118547 15.4009 0.355642 14.9268L12.8537 2.42871H6.07049C5.40001 2.42868 4.85679 1.88528 4.85662 1.21484C4.85663 0.544257 5.3999 1.27214e-05 6.07049 0H15.7844Z" fill="#2FBD04"/>
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M17 15.7853C17 16.4559 16.4568 17.0002 15.7861 17.0002H6.07129C5.40069 17.0001 4.85741 16.4657 4.85742 15.7951C4.85747 15.1246 5.40071 14.5715 6.07129 14.5715L12.8555 14.5715L0.355469 2.07245C-0.11833 1.59828 -0.118439 0.829751 0.355469 0.355653C0.829695 -0.118551 1.59902 -0.118551 2.07324 0.355653L14.5713 12.8537V6.07147C14.5713 5.40085 15.1155 4.85662 15.7861 4.85663C16.4568 4.85665 17 5.40086 17 6.07147V15.7853Z" fill="#CF0003"/>
    </svg>
  );
}

export default function Wallet() {
  return (
    <div className="bg-[#121212] text-white">

      <div className="px-10 pt-6 pb-10 flex flex-col items-center gap-8">
      
      

        <div className="w-full max-w-[700px]">
          <h2 className="text-[28px] font-bold mb-3">
            Carteira
          </h2>
        </div>

        <GlassPanel className="w-full max-w-[700px] h-[410px] rounded-[10px] overflow-hidden -mt-6">

          <div className="w-full h-full p-6 bg-[#0B0B0B] border border-white/10 flex flex-col">
            <h3 className="text-[27px] text-[#545454] font-semibold mb-4">
              Criptomoedas
            </h3>
            <div className="flex-1 space-y-6">
              {CRYPTOS.map((crypto, index) => (
                <GlassPanel
                  key={index}
                  depth="deep"
                  className="flex items-center justify-between p-4 rounded-xl !bg-[#121212] hover:!bg-[#1a1a1a]"
                >

                  {/* lado esquerdo */}
                  <div className="flex-1">
                    <p className="font-semibold">{crypto.symbol}</p>
                    <p className="text-sm text-white/50">{crypto.name}</p>
                  </div>

                  {/* gráfico */}
                  <div className="w-[200px] flex justify-center">
                    {crypto.positive ? <Positive /> : <Negative />}
                  </div>

                  {/* lado direito */}
                  <div className="flex-1 text-right">
                    <div className="flex-1 text-right"></div>


                  <div className="flex items-center justify-end gap-1">
                    {crypto.positive ? <ArrowUp /> : <ArrowDown />}
                    <span className={`text-[18px] font-semibold whitespace-nowrap ${crypto.positive ? 'text-[#2FBD04]' : 'text-[#CF0003]'}`}>
                      {crypto.change}
                    </span>
                  </div>
                  </div>
                  
                </GlassPanel>
                ))}
            </div>
          </div>
        </GlassPanel>

{/* notícias */}    
        <GlassPanel className="w-full max-w-[700px] h-[315px] rounded-[10px] overflow-hidden">

          <div className="w-full h-full p-6 bg-[#0B0B0B] border border-white/10 flex flex-col">
            <h3 className="text-[27px] text-[#545454] font-semibold mb-4">
              Últimas notícias
            </h3>
            <div className="flex flex-col gap-4">
            {NEWS.map((news, index) => (
                <a 
                  key={index}
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <GlassPanel
                  key={index}
                  depth="deep"
                  className="p-4 rounded-xl !bg-[#121212] hover:!bg-[#1a1a1a] cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    {/* texto */}
                    <div className="flex-1">
                      <p className="font-semibold text-[15px]">
                        {news.title}
                      </p>
                      <p className="text-sm text-white/50">
                        {news.description}
                      </p>
                    </div>
                    <span className={`text-sm font-semibold ${
                      news.impact === 'positive' ? 'text-[#2FBD04]': news.impact === 'negative' ? 'text-[#CF0003]' : 'text-[#BDBDBD]'
                    }`}>
                      {news.impact === 'positive' ? 'Alta': news.impact === 'negative'? 'Queda': 'Neutro'}
                    </span>
                  </div>
                  <p className="text-xs text-white/30 mt-2">
                    {news.date}
                  </p>
                </GlassPanel>
                </a>
              ))}
            </div>
            </div>
          </GlassPanel>
                      </div>
                    </div>
            );
          }