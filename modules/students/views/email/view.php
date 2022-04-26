<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Emails\Emails */

$this->title = $model->email_id;
$this->params['breadcrumbs'][] = ['label' => 'Emails', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="emails-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'email_id' => $model->email_id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'email_id' => $model->email_id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'email_id:email',
            'receiver_name',
            'receiver_email:email',
            'subject',
            'content:ntext',
            'attatchment',
            'time',
        ],
    ]) ?>

</div>