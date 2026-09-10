type LogoProps = {
  className?: string;
  variant?: "blue" | "white" | "black";
  withWordmark?: boolean;
};

const fills: Record<NonNullable<LogoProps["variant"]>, string> = {
  blue: "#233DFF",
  white: "#FFFFFF",
  black: "#000000",
};

export function Logo({ className = "", variant = "blue", withWordmark = true }: LogoProps) {
  const fill = fills[variant];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M9 13.5V18.5C9 19.0523 9.44772 19.5 10 19.5H11.8L15.2 22.6C15.5 22.9 16 22.7 16 22.3V9.7C16 9.3 15.5 9.1 15.2 9.4L11.8 12.5H10C9.44772 12.5 9 12.9477 9 13.5Z"
          fill={fill}
        />
        <path d="M19 12.5C20 13.5 20.5 14.7 20.5 16C20.5 17.3 20 18.5 19 19.5" stroke={fill} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M21.6 10.3C23.1 11.9 23.9 13.9 23.9 16C23.9 18.1 23.1 20.1 21.6 21.7" stroke={fill} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      {withWordmark && (
        <span
          className="font-display font-bold tracking-tight text-[1.15rem] leading-none"
          style={{ color: fill }}
        >
          Propaganda<span className="opacity-90"> Adv</span>
        </span>
      )}
    </span>
  );
}
