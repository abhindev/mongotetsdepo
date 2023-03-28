import { Tab } from "@headlessui/react";
import styles from "../../../styles/Details.module.css";

export default function Details(product:any) {

  const details = product.product.details;
  console.log(details);
  details.map((item: any,i:any)=>{
    console.log(item.title);
  })
  
  return (
    <div className={styles.Group}>
      <Tab.Group >  
        <Tab.List className={styles.title}>
          {/* <Tab className={styles.tab}>Discription</Tab>
          <Tab className={styles.tab}>Ingrediance</Tab>
          <Tab className={styles.tab}>Usage</Tab> */}
          {details.map((item:any, i:number)=>
            <div key={i}>
              <Tab className={styles.tab}>{item.title}</Tab>
            </div>
          )}

        </Tab.List>
        <Tab.Panels className={styles.panels}>
        {details.map((item:any, i:number)=>
            <div key={i}>
              <Tab.Panel className={styles.panel}><p>{item.text}</p></Tab.Panel>
            </div>
          )}
          {/* <Tab.Panel className={styles.panel}>
            <p>
              Replenish your scalp with our rejuvenating Hair Growth Oil. This
              magic elixir makes your hair strong, lustrous and healthy while
              repairing the scalp as well. <br/> <br/> Net Quantity - 100ML
            </p>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}