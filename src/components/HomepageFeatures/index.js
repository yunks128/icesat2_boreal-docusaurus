import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Precision Mapping',
    Svg: require('@site/static/img/precision-mapping.svg').default,
    description: (
      <>
        Advanced satellite technology combining ICESat-2/ATLAS data with Landsat/Sentinel-2 imagery for unprecedented accuracy in forest biomass mapping
      </>
    ),
  },
  {
    title: 'Boreal Forest Focus',
    Svg: require('@site/static/img/boreal-forest.svg').default,
    description: (
      <>
        Specialized analysis of the circumpolar boreal region, providing crucial insights into one of Earth's largest carbon sinks
      </>
    ),
  },
  {
    title: 'Data Integration',
    Svg: require('@site/static/img/data-integration.svg').default,
    description: (
      <>
        Seamless fusion of multiple data sources including high-resolution elevation data from Copernicus GLO30 DEM

      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
