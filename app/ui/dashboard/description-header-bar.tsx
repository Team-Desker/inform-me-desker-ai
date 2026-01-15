import * as React from "react";

type DescriptionBarProps = {
  icon: any;
  title?: string;
  headerBarDetailText?: string;
};

const DescriptionBar = ({
  icon: Icon,
  title,
  headerBarDetailText,
}: DescriptionBarProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background border-b border-foreground/10">
      <div className="px-4 py-5">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-foreground" />
            <p className="text-base font-medium">{title}</p>
          </div>
          <p className="text-sm text-muted-foreground ml-0">
            {headerBarDetailText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBar;
