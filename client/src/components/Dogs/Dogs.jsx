/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { upperFirst } from 'lodash';
import fetchDogs from '../../data/dogs';
import { ADOPT_DOG_API } from '../../api';

const dummyImagePath = 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

function Dogs() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchDogs();
      setDogs(response);
    })();
  }, []);

  function getImage(image) {
    if (!image) {
      return dummyImagePath;
    }

    return require(`../../assets/${image}`);
  }

  function handleAdopt(dogId) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ id: dogId }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    };

    return fetch(ADOPT_DOG_API + dogId, options)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const adopted = (available) => {
    return available ? 'available' : 'adopted';
  };

  return (
    <div className='dogs-container'>
      {
        dogs.map((dog) => (
          <Card className={`card ${adopted(dog.available)}`} key={dog._id}>
            <CardMedia
              className='card-image'
              image={getImage(dog.image)}
              title={dog.name}
            />

            <CardContent className='card-content'>
              <h3>{dog.name}</h3>
              <div className='attributes'>
                <p>{upperFirst(dog.gender)}</p>
                { dog.hdbApproved &&
                  <p>HDB approved</p>
                }
              </div>

              <p className='description'>{dog.description}</p>
            </CardContent>

            <CardActions className='card-actions'>
              <button
                type='button'
                className={`adopt ${adopted(dog.available)}`}
                onClick={() => handleAdopt(dog._id)}
              >
                Adopt
              </button>
            </CardActions>
          </Card>
        ))
      }
    </div>
  );
}

export default Dogs;
