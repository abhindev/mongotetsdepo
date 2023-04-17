import { Tab } from "@headlessui/react";
import styles from "../../../styles/Details.module.css";

export default function Details(product: any) {
  const details = product.product.details;
  // console.log(details);
  details.map((item: any, i: any) => {
    // console.log(item.title);
  });

  return (
    <div className={styles.Group}>
      <Tab.Group>
        <Tab.List className={styles.title}>
          {details.map((item: any, i: number) => (
            <div key={i}>
              <Tab className={styles.tab}>{item.title}</Tab>
            </div>
          ))}
        </Tab.List>
        <Tab.Panels className={styles.panels}>
          {details.map((item: any, i: number) => (
            <div key={i}>
              <Tab.Panel className={styles.panel}>
                {item.text.split("\n").map((line: any, index:number) => (
                  <div key={index}>
                    {line}
                    <br />
                  </div>
                ))}
              </Tab.Panel>
            </div>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
