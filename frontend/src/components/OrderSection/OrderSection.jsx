import React from 'react';
import styles from './OrderSection.module.css';
import ubereats from '../../assets/uber-eats.svg';
import grubhub from '../../assets/grubhub.svg';
import postmates from '../../assets/postmates.svg';
import doordash from '../../assets/doordash.svg';
import foodpanda from '../../assets/foodpanda.svg';
import deliveroo from '../../assets/deliveroo.svg';
import instacart from '../../assets/instacart.svg';
import justeat from '../../assets/just-eat.svg';
import didifood from '../../assets/didi-food.svg';


// عندما تكون الصور جاهزة، قم باستيرادها هنا
// import uberEatsIcon from './assets/uber-eats.svg';
// import doorDashIcon from './assets/doordash.svg';
// ...etc

const OrderSection = () => {
  const firstGroup = [
    { icon: ubereats },
    { icon: grubhub },
    { icon: postmates },
    { icon: doordash },
    { icon: foodpanda },
    { icon: deliveroo },
    { icon: instacart },
    {  icon: justeat },
    { icon: didifood }
  ];


  return (
    <div className={styles.orderAppsContainer}>
      <div className={styles.content}>
        
        <div className={styles.textSection}>
          <h1 className={styles.title}>You can order through apps</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit enim bibendum sed et aliquet aliquet risus tempor semper.
          </p>
        </div>

     
        <div className={styles.appsSection}>
    
          <div className={styles.appGroup}>
        
            <div className={styles.appsGrid}>
              {firstGroup.map((app, index) => (
                <div key={index} className={styles.appItem}>
                  <img className={styles.appIcon} src={app.icon} />
                  
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default OrderSection;