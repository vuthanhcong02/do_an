<?php

namespace App\Repositories;


abstract class BaseRepository
{
    protected $model;

    /**
     * Create a new BaseRepository instance, set the model.
     *
     * @return void
     */
    public function __construct()
    {
        // Set the model
        $this->setModel();
    }

    abstract public function getModel();


    /**
     * Set the model property on the class.
     *
     * @return void
     */
    public function setModel()
    {
        /**
         * Create an instance of the model using the app() helper.
         * The make() method takes the name of a class as its argument
         * and returns an instance of that class.
         */
        $this->model = app()->make(
            $this->getModel()
        );
    }

    /**
     * Return all instances of the model.
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getAll()
    {
        /**
         * Get all instances of the model, ordered by the id in descending order,
         * and paginate the results by 10 items.
         */
        return $this->model->orderBy('id', 'desc')->paginate(10);
    }



    /**
     * Find a model by its primary key.
     *
     * @param int $id The primary key of the model.
     *
     * @return \Illuminate\Database\Eloquent\Model|null The model if it exists, null otherwise.
     */
    public function find($id)
    {
        /**
         * Find a model by its primary key.
         *
         * @var \Illuminate\Database\Eloquent\Model $result The result of the find operation.
         */
        $result = $this->model->find($id);

        return $result;
    }


    /**
     * Create a new instance of the model.
     *
     * @param array $attributes The attributes to assign to the new instance.
     *
     * @return \Illuminate\Database\Eloquent\Model The new instance.
     */
    public function create($attributes = [])
    {
        return $this->model->create($attributes);
    }

    /**
     * Update a model by its primary key.
     *
     * @param int $id The primary key of the model.
     * @param array $attributes The attributes to update on the model.
     *
     * @return \Illuminate\Database\Eloquent\Model|bool The updated model if it exists, false otherwise.
     */
    public function update($id, $attributes = [])
    {
        /**
         * Find the model by its primary key.
         *
         * @var \Illuminate\Database\Eloquent\Model $result The result of the find operation.
         */
        $result = $this->find($id);

        if (!$result) {
            return false;
        }
        $result->fill($attributes)->save();

        return $result;
    }


    /**
     * Delete a model by its primary key.
     *
     * @param int $id The primary key of the model.
     *
     * @return bool Whether the deletion was successful or not.
     */
    public function delete($id)
    {
        /**
         * Find the model by its primary key.
         *
         * @var \Illuminate\Database\Eloquent\Model $result The result of the find operation.
         */
        $result = $this->find($id);

        if (!$result) {
            return false;
        }
        $result->delete();

        return true;
    }
}
