<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orderlists', function (Blueprint $table) {
            $table->string('email');
            $table->integer('Order_No');
            $table->string('isbn');
            $table->integer('price');
            $table->foreign('email')->references('email')->on('orders')->onDelete('cascade');
            $table->foreign('isbn')->references('isbn')->on('book')->onDelete('cascade');
            // $table->foreign('Order_No')->references('Order_No')->on('orders')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orderlists');
    }
};
