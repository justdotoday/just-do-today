type Props = { title: string };

const TabPageHeader = ({ title }: Props) => (
  <div className="px-4 pt-6 pb-2">
    <h1 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950">
      {title}
    </h1>
  </div>
);

export default TabPageHeader;
