import { Layout } from "../../components/Layout";
import { HeroSection } from "../../components/sections/HeroSection";
import { BadgeSection } from "../../components/sections/BadgeSection";
import { useWallet } from "../../wallet";

export default function Home(): JSX.Element {
  const wallet = useWallet();
  return (
    <Layout>{wallet?.isConnected ? <BadgeSection /> : <HeroSection />}</Layout>
  );
}
