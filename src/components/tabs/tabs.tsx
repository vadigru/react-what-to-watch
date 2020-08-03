import * as React from "react";

interface Props {
  tabNames: string[];
  className: string;
  activeTab: string;
  onTabClick: (tab: string) => void;
  onGenreTabClick?: () => void;
}

const Tabs: React.FunctionComponent<Props> = (props: Props) => {
  const {tabNames, className, activeTab, onTabClick, onGenreTabClick} = props;

  const chooseHandler = (tab) => {
    if (className === `catalog__genres-`) {
      onTabClick(tab);
      onGenreTabClick();
    } else {
      onTabClick(tab);
    }
  };

  return (
    <ul className={`${className}list`}>
      {tabNames.map((tabName, index) => (
        <li key={tabName + index} className={`${className}item ${activeTab === tabName && `${className}item--active`}`}>
          <a
            href="#"
            className={`${className}link`}
            onClick={(evt) => {
              evt.preventDefault();
              onTabClick(tabName);
              chooseHandler(tabName);
            }}
          >
            {tabName}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
