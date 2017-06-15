import React from 'react';

import GameContainer from './containers/GameContainer'
import { handleKeydown } from './actions'

window.addEventListener('keydown', () => handleKeydown())

const App = () =>
  <div>
    <GameContainer />
  </div>
export default App;
