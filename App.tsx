import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
    const isLoadingComplete = useCachedResources();
    return isLoadingComplete ? <Navigation /> : null;
}
