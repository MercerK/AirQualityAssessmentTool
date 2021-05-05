import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Card, Container, Header } from 'semantic-ui-react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Address, AddressResult } from './Components/Address/Address'
import { AverageAirQuality } from './Components/AverageAirQuality/AverageAirQuality'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container style={{ height: '100vh', display: 'flex' }} className="flex-col">
        <Header style={{ paddingTop: '2rem', textAlign: 'center' }} size="huge">
          Air Quality Assessment Tool
        </Header>
        <main>
          <AirQualityComparison />
        </main>
        <span className="flex-grow" aria-hidden />
        <footer className="ui vertical footer segment">
          <div className="ui container">
            <div>
              All data provided by{' '}
              <a target="_new" href="https://openaq.org/">
                https://openaq.org/
              </a>
              .
            </div>
            <div>Application built by Kyle Mercer. See source code at</div>
          </div>
        </footer>
      </Container>
    </QueryClientProvider>
  )
}

interface AirQualityProps {}

export const AirQualityComparison: React.FC<AirQualityProps> = () => {
  const [locations, setLocations] = useState<AddressResult[]>([
    {
      country: '',
    },
  ])

  return (
    <div className="flex flex-col">
      <div className="ui stackable cards" style={{ justifyContent: 'center' }}>
        {locations.map((loc) => (
          <Card>
            <Card.Content>
              <Card.Header style={{ display: 'flex', maxHeight: '30px' }} className="flex-row">
                <span
                  style={{
                    alignSelf: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    paddingRight: '0.125rem',
                  }}
                >
                  {loc.country && loc.city && loc.locationId && <>Selected: {loc.city}</>}
                  {(!loc.country || !loc.city || !loc.locationId) && <>Select Location</>}
                </span>

                <span className="flex-grow" aria-hidden />

                <Button
                  aria-label="Remove"
                  style={{ float: 'right' }}
                  size="mini"
                  onClick={() => {
                    setLocations(locations.filter((e) => e !== loc))
                  }}
                >
                  X
                </Button>
              </Card.Header>
              <Card.Description>
                <Address
                  onChange={(value) =>
                    setLocations(
                      [...locations].map((e, i) => {
                        if (e === loc) {
                          return {
                            ...value,
                          }
                        }

                        return e
                      })
                    )
                  }
                />
              </Card.Description>
            </Card.Content>
          </Card>
        ))}

        <Card>
          <Card.Content>
            <Card.Description style={{ justifyContent: 'center', display: 'flex' }}>
              <Button onClick={() => setLocations([...locations, { country: '' }])}>Add Location</Button>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>

      {locations.filter((e) => e.locationId).length > 0 && <AverageAirQuality data={locations}></AverageAirQuality>}
    </div>
  )
}

export default App
