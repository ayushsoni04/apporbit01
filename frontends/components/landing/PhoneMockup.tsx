export type PhoneMockupProps = {
  /** Custom content to show inside the phone screen (e.g. app preview). When set, the default static image is not used. */
  children?: React.ReactNode;
};

export function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto h-[808px] w-[396px]">
      <div className="absolute inset-0 overflow-visible" />
      <div className="absolute inset-[15px_20px_17px_20px] overflow-hidden rounded-[26px] bg-[#0f172a]">
        {children ?? (
          <img
            src="/phone/phone-screen.png"
            alt="App preview on phone"
            className="h-full w-[100.11%] max-w-none object-cover object-left"
          />
        )}
      </div>
      <div className="absolute inset-0 overflow-hidden rounded-[26px] pointer-events-none">
        <img
          src="/phone/phone-mockup.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
