import { useEffect, useRef, useState } from 'react'
import './App.css'
import { IModel, loadModels } from './helpers/collection';
import { RapierRigidBody } from '@react-three/rapier';
import { useGame } from './store/game';
import { blocks } from './blocks';
import { ballModel } from './constants/blocks';
import Game from './components/Game';

const modelList = new Set(
  Object.entries(blocks)
    .map(([key, Component]) => Component.models ?? key)
    .flat()
    .concat(ballModel),
);

function App() {
  const [models, setModels] = useState<Record<string, IModel>>();
  const ballRef = useRef<RapierRigidBody>(null);
  const setBallRef = useGame((state) => state.setBallRef);

  useEffect(() => {
    loadModels(Array.from(modelList), "/models/").then(setModels);
    setBallRef(ballRef);
  }, [setBallRef]);

  if (!models) {
    return;
  }

  return <Game models={models} />;
}

export default App
